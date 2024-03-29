import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NextLink, Operation } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import QueueLink from 'apollo-link-queue';
import SerializingLink from 'apollo-link-serialize';
import { LocalStorageWrapper, persistCache } from 'apollo3-cache-persist';
import { setOnline } from '../store/reducers/online.slice';
import { RootState } from '../store/store';

export async function createClient(dispatch: ThunkDispatch<RootState, null, AnyAction>) {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const queueLink = new QueueLink() as any;

    // TODO: remove listeners on shut down
    window.addEventListener('offline', () => {
        console.log('Went offline');
        // Update store
        dispatch(setOnline(false));
        // Open queue when offline
        queueLink.close();
    });
    window.addEventListener('online', async () => {
        console.log('Went online');
        // Update store
        dispatch(setOnline(true));
        // Close queue when online
        queueLink.open();
    });

    const serializingLink = new SerializingLink() as unknown as ApolloLink;

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
