import React from 'react';
import { InputModal } from '../form/InputModal';
import { TargetMarkerInfo } from './Map';
import { Marker } from './Marker';

type TargetProps = {
    info: TargetMarkerInfo | null;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
};

export const Target: React.VFC<TargetProps> = ({ info, isOpen, onClose, onSuccess }) => {
    // No info -> no marker
    if (!info) {
        return null;
    }

    return (
        <>
            <Marker coordinates={[info.coordinates.lng, info.coordinates.lat]} />
            <InputModal coordinates={info.coordinates} isOpen={isOpen} onClose={onClose} onSuccess={onSuccess} />
        </>
    );
};
