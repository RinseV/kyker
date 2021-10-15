import { Table, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React from 'react';
import { AnimalFragment, AnimalsQuery } from '../../../generated/graphql';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { addHiddenAnimal, removeHiddenAnimal } from '../../../store/reducers/preference.slice';
import { AnimalRow } from './AnimalRow';
import { CampsGatesRow } from './CampsGatesRow';

type LegendContentProps = {
    data: AnimalsQuery | undefined;
};

export const LegendContent: React.VFC<LegendContentProps> = ({ data }) => {
    const hiddenAnimals = useAppSelector((state) => state.preferences.hiddenAnimals);
    const dispatch = useAppDispatch();

    const handleVisibilityChange = (animal: AnimalFragment) => {
        if (hiddenAnimals.includes(animal.id)) {
            // If animal is in hidden list, remove it
            dispatch(removeHiddenAnimal(animal.id));
        } else {
            // Otherwise, add it
            dispatch(addHiddenAnimal(animal.id));
        }
    };

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
                        animal={animal}
                        visible={!hiddenAnimals.some((id) => id === animal.id)}
                        toggleVisibility={() => handleVisibilityChange(animal)}
                    />
                ))}
            </Tbody>
        </Table>
    );
};
