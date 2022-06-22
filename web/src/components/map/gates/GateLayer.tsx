import { useColorModeValue } from '@chakra-ui/color-mode';
import React, { useMemo } from 'react';
import { Layer, Source, SymbolLayer } from 'react-map-gl';
import { useGatesQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../store/hooks';

export const GateLayer: React.FC = () => {
    const textColor = useColorModeValue('black', 'white');
    const isHidden = useAppSelector((state) => state.preferences.hideGates);

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
                    coordinates: [gate.longitude, gate.latitude]
                },
                properties: {
                    name: `${gate.name} Gate`,
                    size: 4
                }
            }))
        };
    }, [gates]);

    const layerStyle: SymbolLayer = {
        id: 'gates',
        type: 'symbol',
        layout: {
            'icon-image': 'boom-gate',
            'icon-size': 0.6,
            'text-field': ['get', 'name'],
            'text-size': 14,
            'text-variable-anchor': ['left', 'top', 'bottom', 'right'],
            'text-offset': [0.75, 0]
        },
        paint: {
            'text-color': textColor
        }
    };

    if (isHidden) {
        return null;
    }

    return (
        <Source id="gates" type="geojson" data={features}>
            <Layer {...layerStyle} />
        </Source>
    );
};
