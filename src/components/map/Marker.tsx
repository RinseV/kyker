import Icon from '@chakra-ui/icon';
import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Marker as MapboxMarker } from 'react-mapbox-gl';
import { Props } from 'react-mapbox-gl/lib/marker';

type MarkerProps = {
    coordinates: [number, number];
    size?: number;
    color?: string;
} & Omit<Props, 'coordinates' | 'onClick'>;

/**
 * A marker on the map
 *
 * @param size Box size of the marker (default 30)
 * @param color Color of the marker (default black)
 */
export const Marker: React.VFC<MarkerProps> = ({ coordinates, size = 30, color, ...props }) => {
    return (
        <MapboxMarker coordinates={coordinates} {...props}>
            <Icon as={FaMapMarkerAlt} boxSize={size} color={color} />
        </MapboxMarker>
    );
};
