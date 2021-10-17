import { IconButton } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/react';
import { LngLat } from 'mapbox-gl';
import React from 'react';
import { MdMyLocation } from 'react-icons/md';
import { mapBounds } from '../../../utils/constants';
import { inBounds } from '../../../utils/inBounds';

type LocationButtonProps = {
    userLocation: LngLat | null;
    mapRef: React.MutableRefObject<mapboxgl.Map | null>;
};

export const LocationButton: React.VFC<LocationButtonProps> = ({ userLocation, mapRef }) => {
    const toast = useToast();

    const handleLocationButtonClick = () => {
        if (userLocation) {
            if (inBounds(userLocation, mapBounds)) {
                mapRef.current?.flyTo(
                    {
                        center: userLocation,
                        zoom: 14
                    },
                    { duration: 1000 }
                );
            } else {
                toast({
                    title: 'You are not in the park',
                    description: 'You can only see the park',
                    status: 'error',
                    duration: 5000,
                    isClosable: true
                });
            }
        } else {
            toast({
                title: 'Could not find your location',
                description: 'Please allow location access',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
    };

    return (
        <IconButton
            aria-label="My location"
            icon={<MdMyLocation />}
            title="My location"
            onClick={handleLocationButtonClick}
        />
    );
};
