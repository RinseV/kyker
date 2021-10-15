import { useColorModeValue } from '@chakra-ui/color-mode';
import React, { useMemo } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import { useGatesQuery } from '../../../generated/graphql';

export const GateLayer: React.VFC = () => {
    const textColor = useColorModeValue('black', 'white');
    // TODO: change color or symbol
    const gateColor = useColorModeValue('#2C7A7B', '#4FD1C5');

    const { data: gates } = useGatesQuery();

    const features = useMemo<GeoJSON.FeatureCollection<GeoJSON.Point>>(() => {
        if (!gates?.gates || gates.gates.length === 0) {
            return {
                type: 'FeatureCollection',
                features: []
            };
        }

        return {
            type: 'FeatureCollection',
            features: gates.gates.map((gate) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [gate.location.lon, gate.location.lat]
                },
                properties: {
                    name: `${gate.name} Gate`,
                    size: 4
                }
            }))
        };
    }, [gates]);

    return (
        <>
            <GeoJSONLayer
                data={features}
                circlePaint={{
                    'circle-radius': ['get', 'size'],
                    'circle-color': gateColor
                }}
                symbolLayout={{
                    'text-field': ['get', 'name'],
                    'text-size': 14,
                    'text-variable-anchor': ['left', 'top', 'bottom', 'right'],
                    'text-offset': [1, 0]
                }}
                symbolPaint={{
                    'text-color': textColor
                }}
            />
        </>
    );
};
