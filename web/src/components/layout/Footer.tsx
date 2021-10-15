import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const Footer: React.VFC = () => {
    return (
        <Flex alignItems="center" py={1} px={2}>
            <Text>2021 - Kruger Spotter</Text>
        </Flex>
    );
};
