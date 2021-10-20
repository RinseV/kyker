import { useColorModeValue } from '@chakra-ui/color-mode';
import React, { useMemo } from 'react';
import { GeoJSONLayer } from 'react-mapbox-gl';
import { useGatesQuery } from '../../../generated/graphql';
import { useRefetchWhenOnline } from '../../../hooks/useRefetchWhenOnline';
import { useAppSelector } from '../../../store/hooks';

export const GateLayer: React.VFC = () => {
    const textColor = useColorModeValue('black', 'white');
    const isHidden = useAppSelector((state) => state.preferences.hideGates);

    const { data: gates, refetch } = useGatesQuery();

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

    useRefetchWhenOnline(refetch);

    if (isHidden) {
        return null;
    }

    return (
        <>
            <GeoJSONLayer
                data={features}
                symbolLayout={{
                    'icon-image': 'boom-gate',
                    'icon-size': 0.6,
                    'text-field': ['get', 'name'],
                    'text-size': 14,
                    'text-variable-anchor': ['left', 'top', 'bottom', 'right'],
                    'text-offset': [0.75, 0]
                }}
                symbolPaint={{
                    'text-color': textColor
                }}
            />
        </>
    );
};
