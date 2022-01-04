import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import AppLoading from 'expo-app-loading';
import { NativeBaseProvider, theme } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Navigation } from './components/navigation/Navigation';
import { useFonts } from './hooks/useFonts';
import { createClient } from './utils/apolloClient';

export const ApolloApp: React.VFC = () => {
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState<ApolloClient<NormalizedCacheObject> | null>(null);
    const { isLoaded: fontsLoaded } = useFonts();

    useEffect(() => {
        const getClient = async () => {
            const client = await createClient();
            setClient(client);
            setLoading(false);
        };
        getClient();
    }, []);

    if (!fontsLoaded) {
        return (
            <NativeBaseProvider theme={theme}>
                <AppLoading />
            </NativeBaseProvider>
        );
    }

    if (loading || !client) {
        return (
            <NativeBaseProvider theme={theme}>
                <AppLoading />
            </NativeBaseProvider>
        );
    }

    return (
        <ApolloProvider client={client}>
            <NativeBaseProvider theme={theme}>
                <Navigation />
            </NativeBaseProvider>
        </ApolloProvider>
    );
};
