import { Flex, FormLabel, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { IconType } from 'react-icons/lib';

type SpottingRatingProps = {
    value: number;
    max: number;
    icon: IconType;
    label: string;
};

export const SpottingRating: React.FC<SpottingRatingProps> = ({ value, max, icon, label }) => {
    const activeColor = useColorModeValue('gray.700', 'gray.100');
    const disabledColor = useColorModeValue('gray.300', 'gray.500');

    return (
        <Flex direction="column">
            <FormLabel>{label}</FormLabel>
            <HStack spacing={2}>
                {[...Array(max).keys()]
                    .map((i) => i + 1)
                    .map((i) => (
                        <Icon as={icon} boxSize="20px" key={i} color={i <= value ? activeColor : disabledColor} />
                    ))}
            </HStack>
        </Flex>
    );
};
