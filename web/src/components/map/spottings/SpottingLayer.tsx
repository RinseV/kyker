import { useColorModeValue } from '@chakra-ui/color-mode';
import React, { useCallback, useEffect, useMemo } from 'react';
import { CircleLayer, MapLayerMouseEvent, Layer, Source, useMap } from 'react-map-gl/maplibre';
import { AnimalFragment, SpottingFragment, SpottingsQuery } from '../../../generated/graphql';
import { useAppSelector } from '../../../store/hooks';

type SpottingLayerProps = {
    animal: AnimalFragment;
    spottings: SpottingsQuery['spottings']['nodes'];
    setSelectedSpotting: React.Dispatch<React.SetStateAction<SpottingFragment | null>>;
    editMode: boolean;
    onOpen: () => void;
};

export const SpottingLayer: React.FC<SpottingLayerProps> = ({
    animal,
    spottings,
    setSelectedSpotting,
    editMode,
    onOpen
}) => {
    const layerName = `spottings-${animal.name}`;
    const spottingColor = useColorModeValue(animal.lightColor, animal.darkColor);
    const isHidden = useAppSelector((state) => state.preferences.hiddenAnimals).some((id) => id === animal.id);

    const { current: map } = useMap();

    // Get spottings for current animal
    const animalSpottings = useMemo<SpottingFragment[]>(() => {
        return spottings.filter((s) => s.animal.id === animal.id);
    }, [spottings, animal.id]);

    // Triggered when a spotting is clicked
    const onSpottingClick = useCallback(
        (e: MapLayerMouseEvent) => {
            // Set cursor style back to normal
            e.target.getCanvas().style.cursor = '';

            // If we are in edit mode, we don't want to select a spotting
            if (editMode) {
                return;
            }

            if (e.features?.length === 0) {
                setSelectedSpotting(null);
                return;
            }

            const feature = e.features?.[0];
            const spotting = spottings.filter((s) => s.id === feature?.properties?.id)[0];
            // Get spotting from spottings using ID
            setSelectedSpotting(spotting);
            // Open spotting modal
            onOpen();
            return;
        },
        [editMode, onOpen, setSelectedSpotting, spottings]
    );

    const onMouseEnter = useCallback((e: MapLayerMouseEvent) => {
        e.target.getCanvas().style.cursor = 'pointer';
    }, []);

    const onMouseLeave = useCallback((e: MapLayerMouseEvent) => {
        e.target.getCanvas().style.cursor = '';
    }, []);

    useEffect(() => {
        if (map) {
            map.on('mouseenter', layerName, onMouseEnter);
            map.on('mouseleave', layerName, onMouseLeave);
            map.on('click', layerName, onSpottingClick);
        }

        return () => {
            if (map) {
                map.off('mouseenter', layerName, onMouseEnter);
                map.off('mouseleave', layerName, onMouseLeave);
                map.off('click', layerName, onSpottingClick);
            }
        };
    }, [map, layerName, onMouseEnter, onMouseLeave, onSpottingClick]);

    const features = useMemo<GeoJSON.FeatureCollection<GeoJSON.Point>>(() => {
        return {
            type: 'FeatureCollection',
            features: animalSpottings.map((spotting) => ({
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [spotting.longitude, spotting.latitude]
                },
                properties: {
                    id: spotting.id
                }
            }))
        };
    }, [animalSpottings]);

    const layerStyle: CircleLayer = {
        id: layerName,
        source: layerName,
        type: 'circle',
        paint: {
            'circle-radius': 6,
            'circle-color': spottingColor
        }
    };

    if (isHidden) {
        return null;
    }

    return (
        <Source id={layerName} type="geojson" data={features}>
            <Layer {...layerStyle} />
        </Source>
    );
};
