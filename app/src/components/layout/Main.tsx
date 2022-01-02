import { Center, Flex, StatusBar, useColorModeValue } from 'native-base';
import React from 'react';
import { Header } from './Header';

type MainProps = {
    children: React.ReactNode;
};

export const Main: React.VFC<MainProps> = ({ children }) => {
    const statusBarStyle = useColorModeValue('dark-content', 'light-content');
    const statusBarBackground = useColorModeValue('#f8fafc', '#1e293b');

    return (
        <Flex flex={1} _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'blueGray.50' }} px={4} flexDirection="column">
            <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBackground} />
            <Header />
            <Center my={2}>{children}</Center>
        </Flex>
    );
};
