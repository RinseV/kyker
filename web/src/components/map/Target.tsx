import { useToast } from '@chakra-ui/toast';
import React from 'react';
import { InputModal } from '../form/InputModal';
import { TargetMarkerInfo } from './Map';
import { Marker } from './Marker';

type TargetProps = {
    info: TargetMarkerInfo | null;
    setInfo: React.Dispatch<React.SetStateAction<TargetMarkerInfo | null>>;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    onClose: () => void;
};

export const Target: React.VFC<TargetProps> = ({ info, setInfo, isOpen, setEditMode, onClose }) => {
    const toast = useToast();

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
                // Remove marker on success, also exit edit mode
                onSuccess={() => {
                    toast.closeAll();
                    toast({
                        title: 'Spot added',
                        description: 'The spot has been added to the map',
                        status: 'success',
                        duration: 5000,
                        isClosable: true
                    });
                    setInfo(null);
                    setEditMode(false);
                }}
                onOfflineSuccess={() => {
                    toast.closeAll();
                    toast({
                        title: 'Spot added (offline)',
                        description: 'The spot will be submitted once we have a connection',
                        status: 'success',
                        duration: 5000,
                        isClosable: true
                    });
                    setInfo(null);
                    setEditMode(false);
                }}
            />
        </>
    );
};
