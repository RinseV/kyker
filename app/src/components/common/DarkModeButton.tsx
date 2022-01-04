import { IconButton, MoonIcon, SunIcon, useColorMode, useColorModeValue } from 'native-base';
import React from 'react';

export const DarkModeButton: React.VFC = () => {
    const { toggleColorMode } = useColorMode();
    const icon = useColorModeValue(
        <SunIcon size="sm" color="emerald.400" />,
        <MoonIcon size="sm" color="emerald.500" />
    );

    return (
        <IconButton
            colorScheme="emerald"
            aria-label="Toggle dark mode"
            icon={icon}
            size="sm"
            variant="ghost"
            rounded="lg"
            onPress={toggleColorMode}
        />
    );
};
