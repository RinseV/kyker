import { Heading, HStack } from 'native-base';
import React from 'react';
import { Logo } from './Logo';

export const LogoText: React.VFC = () => {
    return (
        <HStack space={2} alignItems="center">
            <Logo size="xl" />

            <Heading fontFamily="Montserrat_400Regular" fontWeight="normal" fontSize="4xl">
                Kyker
            </Heading>
        </HStack>
    );
};
