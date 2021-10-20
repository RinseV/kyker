import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NextLink, Operation } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';

export async function createClient() {
    // Link for sending requests to the server
    const httpLink = new HttpLink({
        uri: import.meta.env.VITE_APP_BACKEND_URL as string
    });
    // Link for retrying requests
    const retryLink = new RetryLink({
        attempts: {
            max: 5
        }
    });
    // Link to queue requests when offline
    const queueLink = new QueueLink();

    // TODO: remove listeners on shut down
    window.addEventListener('offline', () => {
        console.log('Went offline');
        // TODO: update store
        // Open queue when offline
        queueLink.close();
    });
    window.addEventListener('online', async () => {
        console.log('Went online');
        // TODO: update store
        // Close queue when online
        queueLink.open();
        // TODO: refetch spottings
        // While resetting the cache works, it does require a page reload which is not ideal
        await client.resetStore();
    });

    const serializingLink = new SerializingLink();

    // Link for saving queries to local storage
    const trackerLink = new ApolloLink((operation: Operation, forward: NextLink) => {
        if (forward === undefined) {
            return null;
        }

        // Get queries from local storage
        const trackedQueries = JSON.parse(localStorage.getItem('trackedQueries') || '[]');
        // Get current query
        const { operationName, query, variables } = operation;

        // Create simplified query
        const newTrackedQuery = {
            query,
            variables,
            operationName
        };

        // Add query to local storage
        window.localStorage.setItem('trackedQueries', JSON.stringify([...trackedQueries, newTrackedQuery]));

        // Continue once requests are forwarded
        return forward(operation).map((data) => {
            // Remove current query from local storage and update local storage
            window.localStorage.setItem('trackedQueries', JSON.stringify(trackedQueries));

            return data;
        });
    });

    const link = ApolloLink.from([trackerLink, serializingLink, queueLink, retryLink, httpLink]);

    const cache = new InMemoryCache();
    const client = new ApolloClient({
        cache,
        link
    });

    // Local storage cache for persisting query results
    await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage)
    });

    return client;
}
