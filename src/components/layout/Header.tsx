import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { DarkModeSwitch } from '../common/DarkModeSwitch';

export const Header: React.VFC = () => {
    return (
        <Flex alignItems="center" justifyContent="space-between" p={4}>
            <Heading>Kruger Spotter</Heading>
            <DarkModeSwitch />
        </Flex>
    );
};
