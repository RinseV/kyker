import { useColorModeValue } from '@chakra-ui/color-mode';
import React, { useMemo } from 'react';
import { Source, Layer, SymbolLayer } from 'react-map-gl/maplibre';
import { CampSize, useCampsQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../store/hooks';

export const RestCampLayer: React.FC = () => {
    const textColor = useColorModeValue('black', 'white');
    const isHidden = useAppSelector((state) => state.preferences.hideCamps);

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
                        coordinates: [restCamp.longitude, restCamp.latitude]
                    },
                    properties: {
                        name: restCamp.name,
                        size: restCamp.size
                    }
                };
            })
        };
    }, [camps]);

    const layerStyle: SymbolLayer = {
        id: 'camps',
        source: 'camps',
        type: 'symbol',
        layout: {
            'icon-image': [
                'case',
                ['==', ['get', 'size'], CampSize.Rest],
                'home-group',
                ['==', ['get', 'size'], CampSize.Bush],
                'home',
                ['==', ['get', 'size'], CampSize.Satellite],
                'video-input-antenna',
                ['==', ['get', 'size'], CampSize.Picnic],
                'picnic-table',
                'home'
            ],
            'icon-size': 0.6,
            'text-field': ['get', 'name'],
            'text-size': 14,
            'text-variable-anchor': ['left', 'top', 'bottom', 'right'],
            'text-offset': [0.5, 0]
        },
        paint: {
            'text-color': textColor
        }
    };

    if (isHidden) {
        return null;
    }

    return (
        <Source id="camps" type="geojson" data={features}>
            <Layer {...layerStyle} />
        </Source>
    );
};
