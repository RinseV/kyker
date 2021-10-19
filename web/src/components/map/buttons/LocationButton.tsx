import { IconButton } from '@chakra-ui/button';
import { useToast } from '@chakra-ui/react';
import { LngLat } from 'mapbox-gl';
import React, { useContext } from 'react';
import { MdMyLocation } from 'react-icons/md';
import { MapContext } from 'react-mapbox-gl';
import { mapBounds } from '../../../utils/constants';
import { inBounds } from '../../../utils/inBounds';

type LocationButtonProps = {
    userLocation: LngLat | null;
    setUserLocation: React.Dispatch<React.SetStateAction<LngLat | null>>;
};

export const LocationButton: React.VFC<LocationButtonProps> = ({ userLocation, setUserLocation }) => {
    const toast = useToast();

    const map = useContext(MapContext);

    const handleLocationButtonClick = () => {
        if (!userLocation) {
            // Set user location
            if (window.navigator.geolocation) {
                window.navigator.geolocation.getCurrentPosition(
                    (position) => {
                        // Set user location
                        const { latitude, longitude } = position.coords;
                        setUserLocation(new LngLat(longitude, latitude));
                    },
                    () => {
                        // Not allowed -> do nothing
                    }
                );
            }
        }

        if (userLocation) {
            if (inBounds(userLocation, mapBounds)) {
                map?.flyTo(
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
