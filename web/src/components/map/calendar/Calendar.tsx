import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import React, { useRef } from 'react';

type CalendarProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const Calendar: React.VFC<CalendarProps> = ({ isOpen, onOpen, onClose }) => {
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    return (
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent m={4}>
                <ModalHeader>Date to view</ModalHeader>
                <ModalCloseButton />
                <ModalBody mb={4}>TODO: Add calender component</ModalBody>
            </ModalContent>
        </Modal>
    );
};
