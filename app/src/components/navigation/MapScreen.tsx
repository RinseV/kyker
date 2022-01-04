import React from 'react';
import { Main } from '../layout/Main';
import { Map } from '../map/Map';

export const MapScreen: React.VFC = () => {
    return (
        <Main>
            <Map />
        </Main>
    );
};
