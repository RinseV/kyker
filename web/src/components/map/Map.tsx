import { useColorModeValue } from '@chakra-ui/color-mode';
import { useDisclosure } from '@chakra-ui/react';
import { LngLat, Map as MapboxGLMap, MapMouseEvent } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useEffect, useRef, useState } from 'react';
import ReactMapboxGl from 'react-mapbox-gl';
import { MapEvent } from 'react-mapbox-gl/lib/map-events';
import { mapBounds } from '../../utils/constants';
import { MapButtons } from './buttons/MapButtons';
import { Calendar } from './calendar/Calendar';
import { RestCampLayer } from './camps/RestCampLayer';
import { GateLayer } from './gates/GateLayer';
import { Legend } from './legend/Legend';
import { UserLocation } from './location/UserLocation';
import { SpottingModal } from './spottings/SpottingModal';
import { SpottingsLayer } from './spottings/SpottingsLayer';
import { Target } from './Target';

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

    // Whether we are in "edit" mode or not (able to add spottings)
    const [editMode, setEditMode] = useState(false);
    // Ref is needed for map onClick
    const editModeRef = useRef(false);
    // Target where the click was registered (displays marker)
    const [targetMarker, setTargetMarker] = useState<TargetMarkerInfo | null>(null);
    // User location
    const [userLocation, setUserLocation] = useState<LngLat | null>(null);
    // Selected spotting
    const [selectedSpotting, setSelectedSpotting] = useState<number | null>(null);

    // Whether input modal is open
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Whether legend modal is open
    const { isOpen: legendOpen, onOpen: legendOnOpen, onClose: legendOnClose } = useDisclosure();

    // Whether the calendar modal is open
    const { isOpen: calendarOpen, onOpen: calendarOnOpen, onClose: calendarOnClose } = useDisclosure();

    // Whether the spotting modal is open
    const { isOpen: spottingOpen, onOpen: spottingOnOpen, onClose: spottingOnClose } = useDisclosure();

    // Called on map load
    const onMapLoad = (map: mapboxgl.Map) => {
        // Set mapRef
        mapRef.current = map;
        // Resize map to fill div
        map.resize();
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
    };

    // On click event for map that displays popup
    const handleMapClick = (_: MapboxGLMap, e: MapMouseEvent) => {
        // We have to use the ref here, otherwise it does not work
        if (editModeRef.current) {
            // Set coordinates (and other info)
            setTargetMarker({
                // Limit lon, lat to 4 decimal places (~11 meters of accuracy)
                coordinates: new LngLat(
                    Math.ceil(e.lngLat.lng * 10000) / 10000,
                    Math.ceil(e.lngLat.lat * 10000) / 10000
                )
            });
            onOpen();
        }
    };

    // Update edit mode ref whenever editMode changes
    useEffect(() => {
        editModeRef.current = editMode;
    }, [editMode]);

    return (
        <MapboxMap
            style={style}
            containerStyle={{ flex: 1 }}
            maxBounds={mapBounds}
            center={center}
            zoom={zoom}
            onStyleLoad={onMapLoad}
            onClick={handleMapClick as unknown as MapEvent}
        >
            <>
                <MapButtons
                    editMode={editMode}
                    setEditMode={setEditMode}
                    setTargetMarker={setTargetMarker}
                    userLocation={userLocation}
                    mapRef={mapRef}
                    onLegendClick={legendOnOpen}
                    onDateClick={calendarOnOpen}
                />

                <RestCampLayer />
                <GateLayer />
                <SpottingsLayer setSelectedSpotting={setSelectedSpotting} onOpen={spottingOnOpen} />

                <UserLocation userLocation={userLocation} />

                <Target info={targetMarker} setInfo={setTargetMarker} isOpen={isOpen} onClose={onClose} />
                <Legend isOpen={legendOpen} onClose={legendOnClose} />
                <Calendar isOpen={calendarOpen} onClose={calendarOnClose} />

                <SpottingModal isOpen={spottingOpen} onClose={spottingOnClose} selectedSpotting={selectedSpotting} />
            </>
        </MapboxMap>
    );
};
