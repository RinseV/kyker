import { Checkbox, Td, Tr, useColorModeValue, Text } from '@chakra-ui/react';
import React from 'react';
import { AnimalFragment } from '../../../generated/graphql';

type AnimalRowProps = {
    animal: AnimalFragment;
    visible: boolean;
    toggleVisibility: () => void;
};

export const AnimalRow: React.FC<AnimalRowProps> = ({ animal, visible, toggleVisibility }) => {
    const disabledColor = useColorModeValue('gray.400', 'gray.500');
    return (
        <Tr>
            <Td>
                <div
                    style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: useColorModeValue(animal.lightColor, animal.darkColor),
                        borderRadius: '50%',
                        opacity: animal.disabled ? 0.3 : 1
                    }}
                />
            </Td>
            <Td>
                <Text textColor={animal.disabled ? disabledColor : undefined}>
                    {animal.name}
                    {animal.disabled ? '*' : null}
                </Text>
            </Td>
            <Td>
                <Checkbox
                    // Disable checkbox if animal is disabled, also set unchecked if animal is disabled
                    isChecked={animal.disabled ? false : visible}
                    onChange={toggleVisibility}
                    isDisabled={animal.disabled}
                />
            </Td>
        </Tr>
    );
};
