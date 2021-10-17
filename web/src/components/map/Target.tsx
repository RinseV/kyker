import React from 'react';
import { InputModal } from '../form/InputModal';
import { TargetMarkerInfo } from './Map';
import { Marker } from './Marker';

type TargetProps = {
    info: TargetMarkerInfo | null;
    setInfo: React.Dispatch<React.SetStateAction<TargetMarkerInfo | null>>;
    isOpen: boolean;
    onClose: () => void;
};

export const Target: React.VFC<TargetProps> = ({ info, setInfo, isOpen, onClose }) => {
    // No info -> no marker
    if (!info) {
        return null;
    }

    return (
        <>
            <Marker coordinates={[info.coordinates.lng, info.coordinates.lat]} />
            <InputModal
                coordinates={info.coordinates}
                isOpen={isOpen}
                // Remove marker on modal close
                onClose={() => {
                    setInfo(null);
                    onClose();
                }}
                // Remove marker on success
                onSuccess={() => {
                    setInfo(null);
                }}
            />
        </>
    );
};
