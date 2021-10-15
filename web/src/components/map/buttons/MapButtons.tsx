import { VStack } from '@chakra-ui/layout';
import React from 'react';
import { DateButton } from './DateButton';
import { LegendButton } from './LegendButton';
import { LocationButton } from './LocationButton';

type MapButtonsProps = {
    onLocationClick: () => void;
    onLegendClick: () => void;
    onDateClick: () => void;
};

export const MapButtons: React.VFC<MapButtonsProps> = ({ onLocationClick, onLegendClick, onDateClick }) => {
    return (
        <VStack position="absolute" top="0.5rem" right="0.5rem">
            <LocationButton onClick={onLocationClick} />
            <LegendButton onClick={onLegendClick} />
            <DateButton onClick={onDateClick} />
        </VStack>
    );
};
