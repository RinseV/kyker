import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { App } from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { createClient } from './utils/apolloClient';
import { theme } from './theme';
import { persistor, store } from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import './index.css';

// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register';

const updateSW = registerSW({
    onNeedRefresh() {
        console.log('need refresh');
    },
    onOfflineReady() {
        console.log('offline ready');
    },
    onRegistered() {
        console.log('registered');
    }
});

updateSW(true);

(async () => {
    const client = await createClient();

    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <ApolloProvider client={client}>
                        <ChakraProvider theme={theme}>
                            <App />
                        </ChakraProvider>
                    </ApolloProvider>
                </PersistGate>
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
})();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
