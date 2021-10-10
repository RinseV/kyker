import { useColorMode, Switch } from "@chakra-ui/react";

// Dark mode switch that is fixed to top right corner
export const DarkModeSwitch = (): JSX.Element => {
    const { colorMode, toggleColorMode } = useColorMode();
    const isDark = colorMode === "dark";
    return <Switch position="fixed" top="1rem" right="1rem" color="green" isChecked={isDark} onChange={toggleColorMode} />;
};
