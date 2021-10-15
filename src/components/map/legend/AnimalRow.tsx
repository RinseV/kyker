import { Td, Tr, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { AnimalFragment } from '../../../generated/graphql';

type AnimalRowProps = {
    animal: AnimalFragment;
};

export const AnimalRow: React.VFC<AnimalRowProps> = ({ animal }) => {
    return (
        <Tr>
            <Td>
                <div
                    style={{
                        width: '20px',
                        height: '20px',
                        backgroundColor: useColorModeValue(animal.color.light, animal.color.dark),
                        borderRadius: '50%'
                    }}
                />
            </Td>
            <Td>{animal.name}</Td>
        </Tr>
    );
};
