import React from 'react';
import { Main } from '../layout/Main';
import { Settings } from '../settings/Settings';

export const SettingsScreen: React.VFC = () => {
    return (
        <Main>
            <Settings />
        </Main>
    );
};
