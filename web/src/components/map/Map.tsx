import { useDisclosure } from '@chakra-ui/react';
import { LngLat } from 'maplibre-gl';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactMapboxGl, { MapLayerMouseEvent, MapProvider, MapRef } from 'react-map-gl/maplibre';
import { SpottingFragment } from '../../generated/graphql';
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

import { style } from './style';

import 'maplibre-gl/dist/maplibre-gl.css';

export interface TargetMarkerInfo {
    coordinates: LngLat;
}

export const Map: React.FC = () => {
    const mapRef = useRef<MapRef | null>(null);

    // Whether we are in "edit" mode or not (able to add spottings)
    const [editMode, setEditMode] = useState(false);
    // Ref is needed for map onClick
    const editModeRef = useRef(false);
    // Target where the click was registered (displays marker)
    const [targetMarker, setTargetMarker] = useState<TargetMarkerInfo | null>(null);
    // User location
    const [userLocation, setUserLocation] = useState<LngLat | null>(null);
    // Selected spotting
    const [selectedSpotting, setSelectedSpotting] = useState<SpottingFragment | null>(null);

    // Whether input modal is open
    const { isOpen, onOpen, onClose } = useDisclosure();

    // Whether legend modal is open
    const { isOpen: legendOpen, onOpen: legendOnOpen, onClose: legendOnClose } = useDisclosure();

    // Whether the calendar modal is open
    const { isOpen: calendarOpen, onOpen: calendarOnOpen, onClose: calendarOnClose } = useDisclosure();

    // Whether the spotting modal is open
    const { isOpen: spottingOpen, onOpen: spottingOnOpen, onClose: spottingOnClose } = useDisclosure();

    // Called on map load
    const onMapLoad = useCallback(() => {
        // Resize map to fill div
        mapRef.current?.resize();
    }, []);

    // On click event for map that displays popup
    const handleMapClick = (e: MapLayerMouseEvent) => {
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
        <MapProvider>
            <ReactMapboxGl
                mapboxAccessToken={import.meta.env.VITE_APP_MAPBOX_API_KEY as string}
                initialViewState={{
                    longitude: 31.5896973,
                    latitude: -24.9964431,
                    zoom: 8
                }}
                maxBounds={mapBounds}
                style={{ flex: 1 }}
                mapStyle={style}
                ref={mapRef}
                onLoad={onMapLoad}
                onClick={handleMapClick}
            >
                <MapButtons
                    editMode={editMode}
                    setEditMode={setEditMode}
                    setTargetMarker={setTargetMarker}
                    userLocation={userLocation}
                    setUserLocation={setUserLocation}
                    onLegendClick={legendOnOpen}
                    onDateClick={calendarOnOpen}
                />

                <RestCampLayer />
                <GateLayer />
                <SpottingsLayer setSelectedSpotting={setSelectedSpotting} editMode={editMode} onOpen={spottingOnOpen} />

                <UserLocation userLocation={userLocation} />

                <Target
                    info={targetMarker}
                    setInfo={setTargetMarker}
                    setEditMode={setEditMode}
                    isOpen={isOpen}
                    onClose={onClose}
                />
                <Legend isOpen={legendOpen} onClose={legendOnClose} />
                <Calendar isOpen={calendarOpen} onClose={calendarOnClose} />

                <SpottingModal isOpen={spottingOpen} onClose={spottingOnClose} selectedSpotting={selectedSpotting} />
            </ReactMapboxGl>
        </MapProvider>
    );
};
