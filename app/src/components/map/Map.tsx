import { LogBox } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';
import { Box, Flex, useColorModeValue } from 'native-base';
import React, { useEffect, useState } from 'react';
import { useAssets } from 'expo-asset';
import AppLoading from 'expo-app-loading';
import * as FileSystem from 'expo-file-system';
import { unzip } from 'react-native-zip-archive';
import lightMapStyle from '../../../assets/kyker_light_theme.json';
import darkMapStyle from '../../../assets/kyker_dark_theme.json';

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

const cacheDirectory = `${FileSystem.cacheDirectory}`;
const glyphsPath = `${cacheDirectory}glyphs`;
const spritesPath = `${cacheDirectory}sprites`;

export const Map: React.VFC = () => {
    const [assets, error] = useAssets([
        require('../../../assets/kruger.mbtiles'),
        require('../../../assets/glyphs.zip'),
        require('../../../assets/sprites.zip')
    ]);

    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!assets?.[1] || !assets?.[2]) {
            return;
        }

        (async () => {
            // Glyphs
            const glyphsInfo = await FileSystem.getInfoAsync(glyphsPath);
            if (!glyphsInfo.exists && assets[1].localUri) {
                await unzip(assets[1].localUri, cacheDirectory);
            }

            // Sprites
            const spritesInfo = await FileSystem.getInfoAsync(spritesPath);
            if (!spritesInfo.exists && assets[2].localUri) {
                await unzip(assets[2].localUri, cacheDirectory);
            }

            setLoading(false);
        })();
    }, [assets]);

    const mapStyle = useColorModeValue(lightMapStyle, darkMapStyle);

    if (!assets || error || isLoading) {
        return <AppLoading />;
    }

    const styleJSON = JSON.stringify({
        ...mapStyle,
        glyphs: `${glyphsPath}/{fontstack}/{range}.pbf`,
        sprite: `${spritesPath}/sprite`,
        sources: {
            ...mapStyle.sources,
            openmaptiles: {
                ...mapStyle.sources.openmaptiles,
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
