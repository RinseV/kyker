import Icon from '@chakra-ui/icon';
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Marker as MapboxMarker } from 'react-map-gl';
import type { MarkerProps as Props } from 'react-map-gl';

type MarkerProps = {
    coordinates: [number, number];
    size?: number;
    color?: string;
} & Omit<Props, 'longitude' | 'latitude' | 'onClick'>;

/**
 * A marker on the map
 *
 * @param size Box size of the marker (default 30)
 * @param color Color of the marker (default black)
 */
export const Marker: React.FC<MarkerProps> = ({ coordinates, size = 30, color, ...props }) => {
    return (
        <MapboxMarker longitude={coordinates[0]} latitude={coordinates[1]} {...props}>
            <Icon as={FaMapMarkerAlt} boxSize={size} color={color} />
        </MapboxMarker>
    );
};
