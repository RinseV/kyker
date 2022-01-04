import { Flex, StatusBar, useColorModeValue } from 'native-base';
import React from 'react';

type MainProps = {
    children: React.ReactNode;
};

export const Main: React.VFC<MainProps> = ({ children }) => {
    const statusBarStyle = useColorModeValue('dark-content', 'light-content');
    const statusBarBackground = useColorModeValue('#ffffff', '#0f172a');

    return (
        <Flex flex={1} _dark={{ bg: 'blueGray.800' }} _light={{ bg: 'blueGray.50' }} flexDirection="column">
            <StatusBar barStyle={statusBarStyle} backgroundColor={statusBarBackground} />
            {children}
        </Flex>
    );
};
