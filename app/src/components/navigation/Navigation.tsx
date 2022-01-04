import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, ParamListBase, RouteProp } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FeedScreen } from './FeedScreen';
import { MapScreen } from './MapScreen';
import { SettingsScreen } from './SettingsScreen';
import { useColorModeValue } from 'native-base';

const Tab = createBottomTabNavigator();

export const Navigation: React.VFC = () => {
    const unfocusedIconColor = useColorModeValue('#71717a', '#a1a1aa');
    const focusedIconColor = useColorModeValue('#10b981', '#34d399');

    const getIconName = useCallback((route: RouteProp<ParamListBase, string>) => {
        switch (route.name) {
            case 'Map':
                return 'map';
            case 'Feed':
                return 'menu';
            case 'Settings':
                return 'cog';
            default:
                return 'help-circle';
        }
    }, []);

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, size }) => {
                        const iconName = getIconName(route);

                        return (
                            <MaterialCommunityIcons
                                name={iconName}
                                size={size}
                                color={focused ? focusedIconColor : unfocusedIconColor}
                            />
                        );
                    },
                    tabBarActiveTintColor: focusedIconColor,
                    tabBarInactiveTintColor: unfocusedIconColor
                })}
            >
                <Tab.Screen name="Map" component={MapScreen} />
                <Tab.Screen name="Feed" component={FeedScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};
