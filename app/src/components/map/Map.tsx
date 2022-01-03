// eslint-disable-next-line import/no-unresolved
import { MAPBOX_API_KEY } from '@env';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { Box, Flex, useColorModeValue } from 'native-base';
import React from 'react';

MapboxGL.setAccessToken(MAPBOX_API_KEY);

// Centered on Skukuza
const center: [number, number] = [31.5896973, -24.9964431];

// Limit to Kruger
const mapBounds: { ne: [number, number]; sw: [number, number] } = {
    ne: [30.753648, -25.605811],
    sw: [32.692252, -22.16947]
};

export const Map: React.VFC = () => {
    const styleURL = useColorModeValue(
        'mapbox://styles/r1ns3v/ckul5qrakaf7y18qjbbj3hr91',
        'mapbox://styles/r1ns3v/ckul61lvm3lbx17q1k88qsuyf'
    );

    return (
        <Flex flex={1} alignItems="center" justifyContent="center">
            <Box h="full" w="full">
                <MapboxGL.MapView styleURL={styleURL} pitchEnabled={false} style={{ flex: 1 }}>
                    <MapboxGL.Camera
                        maxBounds={mapBounds}
                        centerCoordinate={center}
                        minZoomLevel={8}
                        zoomLevel={10}
                        maxZoomLevel={16}
                    />
                </MapboxGL.MapView>
            </Box>
        </Flex>
    );
};
