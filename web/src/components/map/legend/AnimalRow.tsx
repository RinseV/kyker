import { Checkbox, Td, Tr, useColorModeValue, Text } from '@chakra-ui/react';
import React from 'react';
import { AnimalFragment } from '../../../generated/graphql';

type AnimalRowProps = {
    animal: AnimalFragment;
    visible: boolean;
    toggleVisibility: () => void;
};

export const AnimalRow: React.VFC<AnimalRowProps> = ({ animal, visible, toggleVisibility }) => {
    const disabledColor = useColorModeValue('gray.400', 'gray.500');
    return (
        <Tr>
            <Td>
                <div
                    style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: useColorModeValue(animal.color.light, animal.color.dark),
                        borderRadius: '50%',
                        opacity: animal.disabled ? 0.3 : 1
                    }}
                />
            </Td>
            <Td>
                <Text textColor={animal.disabled ? disabledColor : undefined}>{animal.name}</Text>
            </Td>
            <Td>
                <Checkbox
                    isChecked={animal.disabled ? false : visible}
                    onChange={toggleVisibility}
                    isDisabled={animal.disabled}
                />
            </Td>
        </Tr>
    );
};
