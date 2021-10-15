import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { IconButton, useColorMode } from '@chakra-ui/react';

// Dark mode switch that is fixed to top right corner
export const DarkModeSwitch = (): JSX.Element => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === 'dark';
    return (
        <IconButton
            colorScheme="green"
            aria-label="Toggle dark mode"
            icon={isDark ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
        />
    );
};
