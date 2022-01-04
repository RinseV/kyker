import { Flex, Text, useColorModeValue } from 'native-base';
import React from 'react';

type SettingsRowProps = {
    label: string;
    description?: string;
    children: React.ReactNode;
};

export const SettingsRow: React.VFC<SettingsRowProps> = ({ label, description, children }) => {
    const descriptionColor = useColorModeValue('gray.500', 'gray.400');

    return (
        <Flex direction="row" justifyContent="space-between" w="full" alignItems="center" p={4}>
            <Flex alignItems="flex-start" direction="column">
                <Text>{label}</Text>
                {description && (
                    <Text fontSize="sm" color={descriptionColor}>
                        {description}
                    </Text>
                )}
            </Flex>
            <Flex alignItems="flex-end" direction="column">
                {children}
            </Flex>
        </Flex>
    );
};
