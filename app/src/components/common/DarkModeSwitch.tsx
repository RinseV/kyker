import { IconButton, MoonIcon, SunIcon, useColorMode, useColorModeValue } from 'native-base';
import React from 'react';

export const DarkModeSwitch: React.VFC = () => {
    const { toggleColorMode } = useColorMode();
    const icon = useColorModeValue(<MoonIcon size="md" />, <SunIcon size="md" />);

    return (
        <IconButton
            colorScheme="green"
            aria-label="Toggle dark mode"
            icon={icon}
            size="sm"
            variant="ghost"
            rounded="lg"
            onPress={toggleColorMode}
        />
    );
};
