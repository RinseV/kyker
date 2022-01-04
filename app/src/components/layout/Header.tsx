import { Row } from 'native-base';
import React from 'react';
import { LogoText } from '../brand/LogoText';
import { DarkModeButton } from '../common/DarkModeButton';

export const Header: React.VFC = () => {
    return (
        <Row w="full" alignItems="center" justifyContent="space-between" p={4}>
            <LogoText />
            <DarkModeButton />
        </Row>
    );
};
