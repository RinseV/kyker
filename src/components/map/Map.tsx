import { useColorModeValue } from '@chakra-ui/color-mode';
import { useDisclosure } from '@chakra-ui/react';
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

// Centered on Skukuza
const center: [number, number] = [31.5896973, -24.9964431];
// Zoom to see southern part of park
const zoom: [number] = [8];

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

    // Whether modal is open
    const { isOpen, onOpen, onClose } = useDisclosure();

    const onMapLoad = (map: mapboxgl.Map) => {
        map.resize();
        map.addControl(new GeolocateControl());
    };

    // On click event for map that displays popup
    const handleClick = (map: mapboxgl.Map, evt: React.SyntheticEvent<any, Event>) => {
        const target = evt as unknown as ClickEvent;
        // Set coordinates (and other info)
        setTargetMarker({
            coordinates: target.lngLat
        });
        // Open input modal
        onOpen();
    };

    // Called if spotting was successfully submitted
    const handleSuccess = () => {
        // Remove current marker
        setTargetMarker(null);
    };

    return (
        <MapboxMap
            // eslint-disable-next-line react/style-prop-object
            style={style}
            containerStyle={{ flex: 1 }}
            maxBounds={bounds}
            center={center}
            zoom={zoom}
            onStyleLoad={onMapLoad}
            onClick={handleClick}
        >
            <>
                <RestCampLayer restCamps={restCampLocations} />
                <GateLayer gates={gateLocations} />
                <Target
                    info={targetMarker}
                    isOpen={isOpen}
                    onOpen={onOpen}
                    onClose={onClose}
                    onSuccess={handleSuccess}
                />
            </>
        </MapboxMap>
    );
};
