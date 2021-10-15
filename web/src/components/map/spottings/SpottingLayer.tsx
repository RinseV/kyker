import { useColorModeValue } from '@chakra-ui/color-mode';
import React, { useMemo } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import { AnimalFragment, useSpottingsQuery } from '../../../generated/graphql';

type SpottingLayerProps = {
    animal: AnimalFragment;
};

export const SpottingLayer: React.VFC<SpottingLayerProps> = ({ animal }) => {
    const spottingColor = useColorModeValue(animal.color.light, animal.color.dark);

    // Get spottings for given animal
    const { data: spottings } = useSpottingsQuery({
        variables: {
            animals: [animal.id]
        }
    });

    const features = useMemo<GeoJSON.FeatureCollection<GeoJSON.Point>>(() => {
        if (!spottings?.spottings || spottings.spottings.length === 0) {
            return {
                type: 'FeatureCollection',
                features: []
            };
        }

        return {
            type: 'FeatureCollection',
            features: spottings.spottings.map((spotting) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [spotting.location.lon, spotting.location.lat]
                },
                properties: {
                    id: spotting.id
                }
            }))
        };
    }, [spottings]);

    return (
        <>
            <GeoJSONLayer
                data={features}
                circlePaint={{
                    'circle-radius': 4,
                    'circle-color': spottingColor
                }}
            />
        </>
    );
};
