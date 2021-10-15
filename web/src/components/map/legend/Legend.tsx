import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/modal';
import { Spinner } from '@chakra-ui/spinner';
import React, { useRef } from 'react';
import { useAnimalsQuery } from '../../../generated/graphql';
import { LegendContent } from './LegendContent';

type LegendProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const Legend: React.VFC<LegendProps> = ({ isOpen, onOpen, onClose }) => {
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const { data, loading } = useAnimalsQuery();

    return (
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent m={4}>
                <ModalHeader>Legend</ModalHeader>
                <ModalCloseButton />
                <ModalBody>{loading ? <Spinner /> : <LegendContent data={data} />}</ModalBody>
            </ModalContent>
        </Modal>
    );
};
