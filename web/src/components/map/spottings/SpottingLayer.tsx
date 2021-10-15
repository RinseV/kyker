import { useColorModeValue } from '@chakra-ui/color-mode';
import React, { useMemo } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import { AnimalFragment, SpottingsQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../store/hooks';

type SpottingLayerProps = {
    animal: AnimalFragment;
    spottings: SpottingsQuery | undefined;
};

export const SpottingLayer: React.VFC<SpottingLayerProps> = ({ animal, spottings }) => {
    const spottingColor = useColorModeValue(animal.color.light, animal.color.dark);
    const isHidden = useAppSelector((state) => state.preferences.hiddenAnimals).some((id) => id === animal.id);

    // Get spottings for current animal
    const animalSpottings = spottings?.spottings.filter((s) => s.animal.id === animal.id);

    const features = useMemo<GeoJSON.FeatureCollection<GeoJSON.Point>>(() => {
        if (!animalSpottings || animalSpottings.length === 0) {
            return {
                type: 'FeatureCollection',
                features: []
            };
        }

        return {
            type: 'FeatureCollection',
            features: animalSpottings.map((spotting) => ({
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
    }, [animalSpottings]);

    if (isHidden) {
        return null;
    }

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
