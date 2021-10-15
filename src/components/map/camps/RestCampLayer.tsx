import { useColorModeValue } from '@chakra-ui/color-mode';
import React, { useMemo } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import { CampSize, useCampsQuery } from '../../../generated/graphql';

export const RestCampLayer: React.VFC = () => {
    // TODO: change color or symbol
    const campColor = useColorModeValue('#B83280', '#F687B3');
    const textColor = useColorModeValue('black', 'white');

    const { data: camps } = useCampsQuery();

    const features = useMemo<GeoJSON.FeatureCollection<GeoJSON.Point>>(() => {
        if (!camps?.camps || camps.camps.length === 0) {
            return {
                type: 'FeatureCollection',
                features: []
            };
        }

        return {
            type: 'FeatureCollection',
            features: camps.camps.map((restCamp) => {
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [restCamp.location.lon, restCamp.location.lat]
                    },
                    properties: {
                        name: restCamp.name,
                        size: restCamp.size
                    }
                };
            })
        };
    }, [camps]);

    return (
        <>
            <GeoJSONLayer
                data={features}
                circlePaint={{
                    'circle-radius': [
                        'case',
                        ['==', ['get', 'size'], CampSize.Rest],
                        6,
                        ['==', ['get', 'size'], CampSize.Bush],
                        4,
                        ['==', ['get', 'size'], CampSize.Sattelite],
                        3,
                        2
                    ],
                    'circle-color': campColor
                }}
                symbolLayout={{
                    'text-field': ['get', 'name'],
                    'text-size': 14,
                    'text-variable-anchor': ['left', 'top', 'bottom', 'right'],
                    'text-offset': [0.5, 0]
                }}
                symbolPaint={{
                    'text-color': textColor
                }}
            />
        </>
    );
};
