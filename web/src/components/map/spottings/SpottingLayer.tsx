import { useColorModeValue } from '@chakra-ui/color-mode';
import { MapLayerMouseEvent } from 'mapbox-gl';
import React, { useCallback, useMemo } from 'react';
import { GeoJSONLayer, Layer } from 'react-mapbox-gl';
import { AnimalFragment, SpottingFragment, SpottingsQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../store/hooks';

type SpottingLayerProps = {
    animal: AnimalFragment;
    spottings: SpottingsQuery;
    setSelectedSpotting: React.Dispatch<React.SetStateAction<number | null>>;
    onOpen: () => void;
};

export const SpottingLayer: React.VFC<SpottingLayerProps> = ({ animal, spottings, setSelectedSpotting, onOpen }) => {
    const spottingColor = useColorModeValue(animal.color.light, animal.color.dark);
    // Text color is just white or black since the contrast is fine for all colors used
    const textColor = useColorModeValue('#FFFFFF', '#000000');
    const isHidden = useAppSelector((state) => state.preferences.hiddenAnimals).some((id) => id === animal.id);

    // Get spottings for current animal
    const animalSpottings = useMemo<SpottingFragment[]>(() => {
        return spottings.spottings.filter((s) => s.animal.id === animal.id);
    }, [spottings, animal.id]);

    // Triggered when a spotting is clicked
    const onSpottingClick = useCallback(
        (e: MapLayerMouseEvent) => {
            if (e.features?.length === 0) {
                setSelectedSpotting(null);
                return;
            }

            const feature = e.features?.[0];
            setSelectedSpotting(feature?.properties?.id);
            onOpen();
            return;
        },
        [onOpen, setSelectedSpotting]
    );

    const features = useMemo<GeoJSON.FeatureCollection<GeoJSON.Point>>(() => {
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
            {/* Layer with data */}
            <GeoJSONLayer
                sourceOptions={{
                    cluster: true,
                    clusterMaxZoom: 12,
                    clusterRadius: 40
                }}
                id={`${animal.id}-cluster`}
                data={features}
            />
            {/* Layer of cluster spots */}
            <Layer
                id={`${animal.id}-cluster-layer`}
                sourceId={`${animal.id}-cluster`}
                filter={['has', 'point_count']}
                type="circle"
                paint={{
                    'circle-radius': 12,
                    'circle-color': spottingColor
                }}
            />
            {/* Layer of cluster point count */}
            <Layer
                id={`${animal.id}-cluster-count`}
                sourceId={`${animal.id}-cluster`}
                filter={['has', 'point_count']}
                layout={{
                    'text-field': ['get', 'point_count'],
                    'text-size': 14,
                    'text-font': ['Open Sans Bold']
                }}
                paint={{
                    'text-color': textColor
                }}
            />
            {/* Layer of unclustered spots */}
            <Layer
                id={`${animal.id}-unclustered`}
                sourceId={`${animal.id}-cluster`}
                filter={['!has', 'point_count']}
                type="circle"
                paint={{
                    'circle-radius': 4,
                    'circle-color': spottingColor
                }}
                onClick={onSpottingClick}
            />
        </>
    );
};
