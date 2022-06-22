import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { SpottingFragment } from '../../../generated/graphql';
import { SpottingContent } from './SpottingContent';

type SpottingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    selectedSpotting: SpottingFragment | null;
};

export const SpottingModal: React.FC<SpottingModalProps> = ({ isOpen, onClose, selectedSpotting }) => {
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    if (!selectedSpotting) {
        return null;
    }

    return (
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent m={4}>
                <ModalHeader>Spotting</ModalHeader>
                <ModalCloseButton />
                <ModalBody mb={4}>
                    <SpottingContent spotting={selectedSpotting} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
