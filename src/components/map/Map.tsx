import { useColorModeValue } from '@chakra-ui/color-mode';
import { GeolocateControl } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { FitBounds } from 'react-mapbox-gl/lib/map';
import { RestCampLayer } from './camps/RestCampLayer';
import { restCampLocations } from './camps/RestCamps';
import { GateLayer } from './gates/GateLayer';
import { gateLocations } from './gates/Gates';

const MapboxMap = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_API_KEY!
});

const bounds: FitBounds = [
    [30.753648, -25.605811],
    [32.692252, -22.16947]
];

const center: [number, number] = [31.5896973, -24.9964431];
const zoom: [number] = [10];

export interface PopupInfo {
    name: string;
    coordinates: [number, number];
}

export const Map: React.VFC = () => {
    const style = useColorModeValue(
        'mapbox://styles/r1ns3v/ckul5qrakaf7y18qjbbj3hr91',
        'mapbox://styles/r1ns3v/ckul61lvm3lbx17q1k88qsuyf'
    );

    const onMapLoad = (map: mapboxgl.Map) => {
        map.addControl(new GeolocateControl());
    };

    return (
        <MapboxMap
            // eslint-disable-next-line react/style-prop-object
            style={style}
            containerStyle={{ height: '100vh', width: '80%' }}
            maxBounds={bounds}
            center={center}
            zoom={zoom}
            onStyleLoad={onMapLoad}
        >
            <>
                <RestCampLayer restCamps={restCampLocations} />
                <GateLayer gates={gateLocations} />
            </>
        </MapboxMap>
    );
};
