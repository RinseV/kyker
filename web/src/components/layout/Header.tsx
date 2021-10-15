import { Box, Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { DarkModeSwitch } from '../common/DarkModeSwitch';
import { Logo } from '../common/Logo';

export const Header: React.VFC = () => {
    return (
        <Flex alignItems="center" justifyContent="space-between" p={4}>
            <Flex alignItems="center">
                <Box boxSize="3rem" mr={4}>
                    <Logo />
                </Box>

                <Heading>Kyker</Heading>
            </Flex>

            <DarkModeSwitch />
        </Flex>
    );
};
