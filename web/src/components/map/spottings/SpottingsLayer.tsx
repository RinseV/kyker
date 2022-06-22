import React from 'react';
import { SpottingFragment, useAnimalsQuery, useSpottingsQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../store/hooks';
import { SpottingLayer } from './SpottingLayer';

type SpottingLayersProps = {
    setSelectedSpotting: React.Dispatch<React.SetStateAction<SpottingFragment | null>>;
    editMode: boolean;
    onOpen: () => void;
};

export const SpottingsLayer: React.VFC<SpottingLayersProps> = ({ setSelectedSpotting, editMode, onOpen }) => {
    const hiddenAnimals = useAppSelector((state) => state.preferences.hiddenAnimals);
    const queryDate = useAppSelector((state) => state.query.date);
    const startHour = useAppSelector((state) => state.query.startHour);
    const endHour = useAppSelector((state) => state.query.endHour);

    const { data: animals } = useAnimalsQuery();
    // We only query on animals that are not hidden
    const { data: spottings } = useSpottingsQuery({
        variables: {
            filter: {
                excludeAnimals: hiddenAnimals,
                date: queryDate,
                startHour,
                endHour
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
                        editMode={editMode}
                        onOpen={onOpen}
                    />
                ))}
        </>
    );
};
