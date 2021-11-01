import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
// eslint-disable-next-line import/no-unresolved
import { registerSW } from 'virtual:pwa-register';
import { ApolloApp } from './ApolloApp';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './store/store';

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

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ApolloApp />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
