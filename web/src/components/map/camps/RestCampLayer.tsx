import { useColorModeValue } from '@chakra-ui/color-mode';
import React, { useMemo } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import { CampSize, useCampsQuery } from '../../../generated/graphql';

export const RestCampLayer: React.VFC = () => {
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
                symbolLayout={{
                    'icon-image': [
                        'case',
                        ['==', ['get', 'size'], CampSize.Rest],
                        'home-group',
                        ['==', ['get', 'size'], CampSize.Bush],
                        'home',
                        ['==', ['get', 'size'], CampSize.Sattelite],
                        'video-input-antenna',
                        'home'
                    ],
                    'icon-size': 0.6,
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
