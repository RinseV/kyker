import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import { useSpottingLazyQuery } from '../../../generated/graphql';
import { SpottingContent } from './SpottingContent';

type SpottingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedSpotting: number | null;
};

export const SpottingModal: React.VFC<SpottingModalProps> = ({ isOpen, onClose, selectedSpotting }) => {
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const [getSpotting, { data, loading }] = useSpottingLazyQuery();

    // Get spotting info when selectedSpotting changes
    useEffect(() => {
        if (selectedSpotting) {
            getSpotting({
                variables: {
                    id: selectedSpotting
                }
            });
        }
    }, [getSpotting, selectedSpotting]);

    if (!selectedSpotting) {
        return null;
    }

    return (
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent m={4}>
                <ModalHeader>Spotting</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{loading ? <Spinner /> : <SpottingContent data={data} />}</ModalBody>
            </ModalContent>
        </Modal>
    );
};
