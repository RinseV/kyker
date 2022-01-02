import AppLoading from 'expo-app-loading';
import { NativeBaseProvider, Text } from 'native-base';
import React from 'react';
import { Main } from './src/components/layout/Main';
import { useFonts } from './src/hooks/useFonts';
import { theme } from './src/theme';

const App: React.VFC = () => {
    const { isLoaded } = useFonts();

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
                <Text>TODO</Text>
            </Main>
        </NativeBaseProvider>
    );
};

// eslint-disable-next-line import/no-default-export
export default App;
