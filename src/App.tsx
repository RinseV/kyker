import React from 'react';
import { Container } from './components/layout/Container';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Map } from './components/map/Map';

export const App = (): JSX.Element => {
    return (
        <Container>
            <Header />
            <Map />
            <Footer />
        </Container>
    );
};

export default App;
