import { Flex, Text } from '@chakra-ui/react';
import React from 'react';

export const Footer: React.FC = () => {
    return (
        <Flex alignItems="center" py={1} px={2}>
            <Text>{new Date().getFullYear()} - Kyker</Text>
        </Flex>
    );
};
