import { ApolloClient, ApolloProvider, NormalizedCacheObject, Operation } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { App } from './App';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { theme } from './theme';
import { createClient } from './utils/apolloClient';

export const ApolloApp: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null);

    const dispatch = useAppDispatch();
    const online = useAppSelector((state) => state.online.online);

    // To refetch all active queries
    const refetchAll = useCallback(async () => {
        if (client) {
            await client.refetchQueries({
                include: 'active'
            });
        }
    }, [client]);

    // Get client as soon as component mounts
    useEffect(() => {
        const getClient = async () => {
            const client = await createClient(dispatch);
            setClient(client);
            setLoading(false);
        };
        getClient();
    }, [dispatch]);

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

    // Refetch all queries when online status changes
    useEffect(() => {
        const refetch = async () => {
            if (online) {
                await refetchAll();
            }
        };
        refetch();
    }, [online, refetchAll]);

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
