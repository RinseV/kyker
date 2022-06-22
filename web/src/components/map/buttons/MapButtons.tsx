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
    setUserLocation: React.Dispatch<React.SetStateAction<LngLat | null>>;
    onLegendClick: () => void;
    onDateClick: () => void;
};

export const MapButtons: React.FC<MapButtonsProps> = ({
    editMode,
    setEditMode,
    setTargetMarker,
    userLocation,
    setUserLocation,
    onLegendClick,
    onDateClick
}) => {
    return (
        <VStack position="absolute" top="0.5rem" right="0.5rem">
            <AddButton editMode={editMode} setEditMode={setEditMode} setTargetMarker={setTargetMarker} />
            <LocationButton userLocation={userLocation} setUserLocation={setUserLocation} />
            <LegendButton onClick={onLegendClick} />
            <DateButton onClick={onDateClick} />
        </VStack>
    );
};
