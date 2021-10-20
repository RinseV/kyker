import { ApolloClient, ApolloProvider, NormalizedCacheObject, Operation } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { App } from './App';
import { theme } from './theme';
import { createClient } from './utils/apolloClient';

export const ApolloApp: React.VFC = () => {
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null);

    // Get client as soon as component mounts
    useEffect(() => {
        const getClient = async () => {
            const client = await createClient();
            setClient(client);
            setLoading(false);
        };
        getClient();
    }, []);

    useEffect(() => {
        if (!client) {
            return;
        }

        // Execute all tracked queries
        const execute = async () => {
            // Get queries from local storage
            const trackedQueries: Operation[] = JSON.parse(localStorage.getItem('trackedQueries') || '[]');

            // Map tracked queries to promises
            const promises = trackedQueries.map(({ variables, query }) =>
                client.mutate({
                    variables,
                    mutation: query
                })
            );

            try {
                // Fire queries
                await Promise.all(promises);
            } catch (error) {
                console.log(error);
                // TODO: show error
            }

            // Set local storage to empty array
            window.localStorage.setItem('trackedQueries', '[]');
        };

        execute();
    }, [client]);

    // TODO: Add a loading screen?
    if (loading || !client) {
        return null;
    }

    return (
        <ApolloProvider client={client}>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </ApolloProvider>
    );
};
