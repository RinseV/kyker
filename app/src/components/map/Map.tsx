import { LogBox } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { Box, Flex } from 'native-base';
import React from 'react';
import { useAssets } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import mapStyle from '../../../assets/kyker.json';

// Value does not matter
MapboxGL.setAccessToken('');
MapboxGL.setConnected(true);

LogBox.ignoreLogs(['Not found in mbtile database']);

// Centered on Skukuza
const center: [number, number] = [31.5896973, -24.9964431];

// Limit to Kruger
const mapBounds: { ne: [number, number]; sw: [number, number] } = {
    ne: [30.753648, -25.605811],
    sw: [32.692252, -22.16947]
};

export const Map: React.VFC = () => {
    const [assets, error] = useAssets([require('../../../assets/kruger.mbtiles')]);

    if (!assets || error) {
        return <AppLoading />;
    }

    const styleJSON = JSON.stringify({
        ...mapStyle,
        sources: {
            ...mapStyle.sources,
            composite: {
                ...mapStyle.sources.composite,
                url: `mbtiles://${assets[0].localUri}`
            }
        }
    });

    return (
        <Flex flex={1} alignItems="center" justifyContent="center">
            <Box h="full" w="full">
                <MapboxGL.MapView styleJSON={styleJSON} pitchEnabled={false} style={{ flex: 1 }}>
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
