import { VStack } from '@chakra-ui/layout';
import React from 'react';
import { LegendButton } from './LegendButton';
import { LocationButton } from './LocationButton';

type MapButtonsProps = {
    onLocationClick: () => void;
    onLegendClick: () => void;
};

export const MapButtons: React.VFC<MapButtonsProps> = ({ onLocationClick, onLegendClick }) => {
    return (
        <VStack position="absolute" top="0.5rem" right="0.5rem">
            <LocationButton onClick={onLocationClick} />
            <LegendButton onClick={onLegendClick} />
        </VStack>
    );
};
