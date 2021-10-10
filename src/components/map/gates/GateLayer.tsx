import { useColorModeValue } from '@chakra-ui/color-mode';
import React, { useMemo } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import { Gate } from './Gates';

type GateLayerProps = {
    gates: Gate[];
};

export const GateLayer: React.VFC<GateLayerProps> = ({ gates }) => {
    const textColor = useColorModeValue('black', 'white');
    const gateColor = useColorModeValue('#2C7A7B', '#4FD1C5');

    const features = useMemo<GeoJSON.FeatureCollection<GeoJSON.Point>>(() => {
        return {
            type: 'FeatureCollection',
            features: gates.map((gate) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [gate.lon, gate.lat]
                },
                properties: {
                    name: `${gate.name} Gate`
                }
            }))
        };
    }, [gates]);

    return (
        <>
            <GeoJSONLayer
                data={features}
                circlePaint={{
                    'circle-radius': 4,
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
