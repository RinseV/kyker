import React from 'react';
import { Main } from '../components/layout/Main';
import { Map } from '../components/map/Map';

export const MapScreen: React.VFC = () => {
    return (
        <Main>
            <Map />
        </Main>
    );
};
