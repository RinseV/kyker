import { useColorModeValue } from '@chakra-ui/color-mode';
import { GeolocateControl, LngLat } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { FitBounds } from 'react-mapbox-gl/lib/map';
import { RestCampLayer } from './camps/RestCampLayer';
import { restCampLocations } from './camps/RestCamps';
import { GateLayer } from './gates/GateLayer';
import { gateLocations } from './gates/Gates';
import { Target } from './Target';

interface ClickEvent {
    lngLat: LngLat;
}

const MapboxMap = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_API_KEY!
});

const bounds: FitBounds = [
    [30.753648, -25.605811],
    [32.692252, -22.16947]
];

const center: [number, number] = [31.5896973, -24.9964431];
const zoom: [number] = [10];

export interface TargetMarkerInfo {
    coordinates: LngLat;
}

export const Map: React.VFC = () => {
    const style = useColorModeValue(
        'mapbox://styles/r1ns3v/ckul5qrakaf7y18qjbbj3hr91',
        'mapbox://styles/r1ns3v/ckul61lvm3lbx17q1k88qsuyf'
    );

    // Target where the click was registered (displays marker)
    const [targetMarker, setTargetMarker] = useState<TargetMarkerInfo | null>(null);

    const onMapLoad = (map: mapboxgl.Map) => {
        map.addControl(new GeolocateControl());
    };

    // On click event for map that displays popup
    const handleClick = (map: mapboxgl.Map, evt: React.SyntheticEvent<any, Event>) => {
        const target = evt as unknown as ClickEvent;
        setTargetMarker({
            coordinates: target.lngLat
        });
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
            onClick={handleClick}
        >
            <>
                <RestCampLayer restCamps={restCampLocations} />
                <GateLayer gates={gateLocations} />
                <Target info={targetMarker} />
            </>
        </MapboxMap>
    );
};
