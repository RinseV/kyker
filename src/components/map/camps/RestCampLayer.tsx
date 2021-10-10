import { useColorModeValue } from '@chakra-ui/color-mode';
import React, { useMemo } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import { CampType, RestCamp } from './RestCamps';

type RestCampLayerProps = {
    restCamps: RestCamp[];
};

export const RestCampLayer: React.VFC<RestCampLayerProps> = ({ restCamps }) => {
    const restCampColor = useColorModeValue('#B83280', '#F687B3');
    const otherCampColor = useColorModeValue('#6B46C1', '#B794F4');
    const textColor = useColorModeValue('black', 'white');

    const features = useMemo<GeoJSON.FeatureCollection<GeoJSON.Point>>(() => {
        return {
            type: 'FeatureCollection',
            features: restCamps.map((restCamp) => {
                return {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [restCamp.lon, restCamp.lat]
                    },
                    properties: {
                        name: restCamp.name,
                        type: restCamp.type
                    }
                };
            })
        };
    }, [restCamps]);

    return (
        <>
            <GeoJSONLayer
                data={features}
                circlePaint={{
                    'circle-radius': [
                        'case',
                        ['==', ['get', 'type'], CampType.REST],
                        6,
                        ['==', ['get', 'type'], CampType.BUSH],
                        4,
                        ['==', ['get', 'type'], CampType.SATTELITE],
                        3,
                        2
                    ],
                    'circle-color': ['case', ['==', ['get', 'type'], CampType.REST], restCampColor, otherCampColor]
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
