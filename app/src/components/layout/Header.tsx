import { Row } from 'native-base';
import React from 'react';
import { LogoText } from '../brand/LogoText';
import { DarkModeSwitch } from '../common/DarkModeSwitch';

export const Header: React.VFC = () => {
    return (
        <Row w="full" alignItems="center" justifyContent="space-between" p={4}>
            <LogoText />
            <DarkModeSwitch />
        </Row>
    );
};
