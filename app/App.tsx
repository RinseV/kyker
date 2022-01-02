import AppLoading from 'expo-app-loading';
import { NativeBaseProvider, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { LogoText } from './src/components/brand/LogoText';
import { DarkModeToggle } from './src/components/DarkModeToggle';
import { Main } from './src/components/layout/Main';
import { useFonts } from './src/hooks/useFonts';
import { theme } from './src/theme';

export default function App() {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        useFonts().then(() => setIsLoaded(true));
    }, []);

    if (!isLoaded) {
        return (
            <NativeBaseProvider theme={theme}>
                <AppLoading />
            </NativeBaseProvider>
        );
    }

    return (
        <NativeBaseProvider theme={theme}>
            <Main>
                <VStack space={5} alignItems="center">
                    <LogoText />
                    <DarkModeToggle />
                </VStack>
            </Main>
        </NativeBaseProvider>
    );
}
