import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloApp } from './src/ApolloApp';
import { persistor, store } from './src/store/store';

const App: React.VFC = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ApolloApp />
            </PersistGate>
        </Provider>
    );
};

// eslint-disable-next-line import/no-default-export
export default App;
