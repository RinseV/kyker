import { VStack } from '@chakra-ui/layout';
import { LngLat } from 'mapbox-gl';
import React from 'react';
import { TargetMarkerInfo } from '../Map';
import { AddButton } from './AddButton';
import { DateButton } from './DateButton';
import { LegendButton } from './LegendButton';
import { LocationButton } from './LocationButton';

type MapButtonsProps = {
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setTargetMarker: React.Dispatch<React.SetStateAction<TargetMarkerInfo | null>>;
    userLocation: LngLat | null;
    mapRef: React.MutableRefObject<mapboxgl.Map | null>;
    onLegendClick: () => void;
    onDateClick: () => void;
};

export const MapButtons: React.VFC<MapButtonsProps> = ({
    editMode,
    setEditMode,
    setTargetMarker,
    userLocation,
    mapRef,
    onLegendClick,
    onDateClick
}) => {
    return (
        <VStack position="absolute" top="0.5rem" right="0.5rem">
            <AddButton editMode={editMode} setEditMode={setEditMode} setTargetMarker={setTargetMarker} />
            <LocationButton userLocation={userLocation} mapRef={mapRef} />
            <LegendButton onClick={onLegendClick} />
            <DateButton onClick={onDateClick} />
        </VStack>
    );
};
