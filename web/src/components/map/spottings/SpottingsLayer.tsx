import React from 'react';
import { SpottingFragment, useAnimalsQuery, useSpottingsQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../store/hooks';
import { SpottingLayer } from './SpottingLayer';

type SpottingLayersProps = {
    setSelectedSpotting: React.Dispatch<React.SetStateAction<SpottingFragment | null>>;
    onOpen: () => void;
};

export const SpottingsLayer: React.VFC<SpottingLayersProps> = ({ setSelectedSpotting, onOpen }) => {
    const hiddenAnimals = useAppSelector((state) => state.preferences.hiddenAnimals);
    const queryDate = useAppSelector((state) => state.preferences.queryDate);

    const { data: animals } = useAnimalsQuery();
    // We only query on animals that are not hidden
    const { data: spottings } = useSpottingsQuery({
        variables: {
            excludedAnimals: hiddenAnimals,
            date: {
                date: queryDate
            }
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
                    <SpottingLayer
                        key={animal.id}
                        animal={animal}
                        spottings={spottings}
                        setSelectedSpotting={setSelectedSpotting}
                        onOpen={onOpen}
                    />
                ))}
        </>
    );
};
