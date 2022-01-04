import { ApolloClient, ApolloProvider, NormalizedCacheObject } from '@apollo/client';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { NativeBaseProvider, theme } from 'native-base';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from './hooks/useFonts';
import { FeedScreen } from './screens/FeedScreen';
import { MapScreen } from './screens/MapScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { createClient } from './utils/apolloClient';

const Tab = createBottomTabNavigator();

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
                <NavigationContainer>
                    <Tab.Navigator
                        screenOptions={({ route }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                let iconName;

                                if (route.name === 'Map') {
                                    iconName = 'map';
                                } else if (route.name === 'Feed') {
                                    iconName = 'menu';
                                } else if (route.name === 'Settings') {
                                    iconName = 'cog';
                                } else {
                                    iconName = 'help-circle';
                                }

                                // TODO: change colors for light/dark mode as well as focused/unfocused

                                return <MaterialCommunityIcons name={iconName as any} size={size} color={color} />;
                            }
                        })}
                    >
                        <Tab.Screen name="Map" component={MapScreen} />
                        <Tab.Screen name="Feed" component={FeedScreen} />
                        <Tab.Screen name="Settings" component={SettingsScreen} />
                    </Tab.Navigator>
                </NavigationContainer>
            </NativeBaseProvider>
        </ApolloProvider>
    );
};
