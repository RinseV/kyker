import { useColorModeValue } from '@chakra-ui/color-mode';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { LngLat } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useRef, useState } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { mapBounds } from '../../utils/constants';
import { inBounds } from '../../utils/inBounds';
import { MapButtons } from './buttons/MapButtons';
import { Calendar } from './calendar/Calendar';
import { RestCampLayer } from './camps/RestCampLayer';
import { GateLayer } from './gates/GateLayer';
import { Legend } from './legend/Legend';
import { SpottingsLayer } from './spottings/SpottingsLayer';
import { Target } from './Target';

interface ClickEvent {
    lngLat: LngLat;
}

const MapboxMap = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_API_KEY as string
});

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

    const mapRef = useRef<mapboxgl.Map | null>(null);
    const toast = useToast();

    // Target where the click was registered (displays marker)
    const [targetMarker, setTargetMarker] = useState<TargetMarkerInfo | null>(null);
    // User location
    const [userLocation, setUserLocation] = useState<LngLat | null>(null);

    // Whether input modal is open
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Whether legend modal is open
    const { isOpen: legendOpen, onOpen: legendOnOpen, onClose: legendOnClose } = useDisclosure();

    // Whether the calendar modal is open
    const { isOpen: calendarOpen, onOpen: calendarOnOpen, onClose: calendarOnClose } = useDisclosure();

    const onMapLoad = (map: mapboxgl.Map) => {
        mapRef.current = map;
        map.resize();
        // map.addControl(new GeolocateControl());
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
    };

    const onLocationButtonClick = () => {
        if (userLocation) {
            if (inBounds(userLocation, mapBounds)) {
                mapRef.current?.flyTo(
                    {
                        center: userLocation,
                        zoom: 12
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

    // On click event for map that displays popup
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClick = (map: mapboxgl.Map, evt: React.SyntheticEvent<any, Event>) => {
        const target = evt as unknown as ClickEvent;
        // Set coordinates (and other info)
        setTargetMarker({
            // Limit lon, lat to 4 decimal places (~11 meters of accuracy)
            coordinates: new LngLat(
                Math.ceil(target.lngLat.lng * 10000) / 10000,
                Math.ceil(target.lngLat.lat * 10000) / 10000
            )
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
            maxBounds={mapBounds}
            center={center}
            zoom={zoom}
            onStyleLoad={onMapLoad}
            onClick={handleClick}
        >
            <>
                <MapButtons
                    onLocationClick={onLocationButtonClick}
                    onLegendClick={legendOnOpen}
                    onDateClick={calendarOnOpen}
                />

                <RestCampLayer />
                <GateLayer />
                <SpottingsLayer />
                <Target info={targetMarker} isOpen={isOpen} onClose={onClose} onSuccess={handleSuccess} />
                <Legend isOpen={legendOpen} onClose={legendOnClose} />
                <Calendar isOpen={calendarOpen} onOpen={calendarOnOpen} onClose={calendarOnClose} />
            </>
        </MapboxMap>
    );
};
