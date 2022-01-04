import { Switch, useColorMode } from 'native-base';
import React from 'react';

export const DarkModeSwitch: React.VFC = () => {
    const { toggleColorMode } = useColorMode();

    return <Switch colorScheme="emerald" onChange={toggleColorMode} />;
};
