import { Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { AnimalsQuery } from '../../../generated/graphql';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { toggleHiddenAnimal } from '../../../store/reducers/preference.slice';
import { AnimalRow } from './AnimalRow';
import { CampsGatesRow } from './CampsGatesRow';

type LegendContentProps = {
    data: AnimalsQuery | undefined;
};

export const LegendContent: React.FC<LegendContentProps> = ({ data }) => {
    const hiddenAnimals = useAppSelector((state) => state.preferences.hiddenAnimals);
    const dispatch = useAppDispatch();

    if (!data) {
        return <Text>No animals found</Text>;
    }

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Display</Th>
                    <Th>Animal</Th>
                    <Th>Visible</Th>
                </Tr>
            </Thead>
            <Tbody>
                <CampsGatesRow />
                {data.animals.map((animal) => (
                    <AnimalRow
                        key={animal.id}
                        animal={animal}
                        visible={!hiddenAnimals.some((id) => id === animal.id)}
                        toggleVisibility={() => dispatch(toggleHiddenAnimal(animal.id))}
                    />
                ))}
            </Tbody>
        </Table>
    );
};
