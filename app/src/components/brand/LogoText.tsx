import { Flex, Heading } from 'native-base';
import React from 'react';
import { Logo } from './Logo';

export const LogoText: React.VFC = () => {
    return (
        <Flex direction="row" alignItems="center">
            <Logo size="3xl" />

            <Heading fontFamily="Montserrat_400Regular" fontWeight="normal" fontSize="6xl">
                Kyker
            </Heading>
        </Flex>
    );
};
