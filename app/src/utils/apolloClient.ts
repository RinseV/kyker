import { ApolloClient } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
// eslint-disable-next-line import/no-unresolved
import { BACKEND_URL } from '@env';

export async function createClient() {
    const client = new ApolloClient({
        uri: BACKEND_URL,
        cache: new InMemoryCache()
    });

    return client;
}
