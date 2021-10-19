import { ApolloClient, InMemoryCache } from '@apollo/client';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';

export async function createClient() {
    const cache = new InMemoryCache();
    const client = new ApolloClient({
        cache,
        uri: import.meta.env.VITE_APP_BACKEND_URL as string
    });

    await persistCache({
        cache,
        storage: new LocalStorageWrapper(window.localStorage)
    });

    return client;
}
