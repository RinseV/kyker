import { Table, Tbody, Th, Thead, Tr, Text } from '@chakra-ui/react';
import React from 'react';
import { AnimalsQuery } from '../../../generated/graphql';
import { AnimalRow } from './AnimalRow';

type LegendContentProps = {
    data: AnimalsQuery | undefined;
};

export const LegendContent: React.VFC<LegendContentProps> = ({ data }) => {
    if (!data) {
        return <Text>No animals found</Text>;
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Color</Th>
                    <Th>Animal</Th>
                </Tr>
            </Thead>
            <Tbody>
                {data.animals.map((animal) => (
                    <AnimalRow animal={animal} />
                ))}
            </Tbody>
        </Table>
    );
};
