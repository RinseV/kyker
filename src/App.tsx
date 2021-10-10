import React from 'react';
import { DarkModeSwitch } from './components/common/DarkModeSwitch';
import { Container } from './components/layout/Container';
import { Map } from './components/map/Map';

export const App = (): JSX.Element => {
    return (
        <Container>
            <DarkModeSwitch />
            <Map />
        </Container>
    );
};

export default App;
