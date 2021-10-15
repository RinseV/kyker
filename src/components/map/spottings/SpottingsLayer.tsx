import React from 'react';
import { useAnimalsQuery } from '../../../generated/graphql';
import { SpottingLayer } from './SpottingLayer';

export const SpottingsLayer: React.VFC = () => {
    const { data } = useAnimalsQuery();

    // Return null if loading or no data
    if (!data?.animals || data.animals.length === 0) {
        return null;
    }

    // TODO: legend for different colours
    // TODO: toggle different animal layers
    // TODO: onClick for each spotting?
    // TODO: clusters for spottings?

    return (
        <>
            {data.animals.map((animal) => (
                <SpottingLayer animal={animal} />
            ))}
        </>
    );
};
