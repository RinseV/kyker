import React from 'react';
import { useAnimalsQuery, useSpottingsQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../store/hooks';
import { SpottingLayer } from './SpottingLayer';

export const SpottingsLayer: React.VFC = () => {
    const hiddenAnimals = useAppSelector((state) => state.preferences.hiddenAnimals);

    const { data: animals } = useAnimalsQuery();
    // We only query on animals that are not hidden
    const { data: spottings } = useSpottingsQuery({
        variables: {
            excludedAnimals: hiddenAnimals
        }
    });

    // Return null if loading or no data
    if (
        !animals?.animals ||
        animals.animals.length === 0 ||
        !spottings?.spottings ||
        spottings.spottings.length === 0
    ) {
        return null;
    }

    return (
        <>
            {/* Only add a SpottingLayer if the animal is not hidden */}
            {animals.animals
                .filter((animal) => !hiddenAnimals.some((id) => id === animal.id))
                .map((animal) => (
                    <SpottingLayer key={animal.id} animal={animal} spottings={spottings} />
                ))}
        </>
    );
};
