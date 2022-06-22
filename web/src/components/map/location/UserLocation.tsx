import { useColorModeValue } from '@chakra-ui/color-mode';
import { chakra, keyframes } from '@chakra-ui/system';
import { LngLat } from 'mapbox-gl';
import React from 'react';
import { Marker } from 'react-map-gl';

const pulse = keyframes`
0%   { transform: scale(1); opacity: 1; }
70%  { transform: scale(3); opacity: 0; }
100% { transform: scale(1); opacity: 0; }
`;

type UserLocationProps = {
    userLocation: LngLat | null;
};

export const UserLocation: React.FC<UserLocationProps> = ({ userLocation }) => {
    const locationColor = useColorModeValue('cyan.600', 'cyan.400');
    const pulseAnimation = `${pulse} 2s infinite`;

    if (!userLocation) {
        return null;
    }

    return (
        <Marker longitude={userLocation.lng} latitude={userLocation.lat}>
            <chakra.div position="relative">
                {/* Indicator with pulse animation */}
                <chakra.div
                    w={4}
                    h={4}
                    backgroundColor={locationColor}
                    borderRadius="50%"
                    _before={{
                        backgroundColor: locationColor,
                        content: '""',
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        position: 'absolute',
                        animation: pulseAnimation
                    }}
                    _after={{
                        borderRadius: '50%',
                        border: '2px solid #fff',
                        content: '""',
                        height: 4,
                        width: 4,
                        position: 'absolute',
                        boxShadow: '0 0 3px rgba(0, 0, 0, 0.35)'
                    }}
                />
            </chakra.div>
        </Marker>
    );
};
