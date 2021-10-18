import { useColorModeValue } from '@chakra-ui/color-mode';
import { MapLayerMouseEvent } from 'mapbox-gl';
import React, { useCallback, useMemo } from 'react';
import { GeoJSONLayer, Layer } from 'react-mapbox-gl';
import { AnimalFragment, SpottingFragment, SpottingsQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../store/hooks';

type SpottingLayerProps = {
    animal: AnimalFragment;
    spottings: SpottingsQuery;
    setSelectedSpotting: React.Dispatch<React.SetStateAction<SpottingFragment | null>>;
    editMode: boolean;
    onOpen: () => void;
};

export const SpottingLayer: React.VFC<SpottingLayerProps> = ({
    animal,
    spottings,
    setSelectedSpotting,
    editMode,
    onOpen
}) => {
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
            // If we are in edit mode, we don't want to select a spotting
            if (editMode) {
                return;
            }

            if (e.features?.length === 0) {
                setSelectedSpotting(null);
                return;
            }

            const feature = e.features?.[0];
            // Get spotting from spottings using ID
            setSelectedSpotting(spottings.spottings.filter((s) => s.id === feature?.properties?.id)[0]);
            // Open spotting modal
            onOpen();
            return;
        },
        [editMode, onOpen, setSelectedSpotting, spottings.spottings]
    );

    const onMouseEnter = (e: MapLayerMouseEvent) => {
        e.target.getCanvas().style.cursor = 'pointer';
    };

    const onMouseLeave = (e: MapLayerMouseEvent) => {
        e.target.getCanvas().style.cursor = '';
    };

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
                    'circle-radius': 16,
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
                    'text-size': 16,
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
                    'circle-radius': 6,
                    'circle-color': spottingColor
                }}
                onClick={onSpottingClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            />
        </>
    );
};
