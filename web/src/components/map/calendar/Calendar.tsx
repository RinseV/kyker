import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, VStack } from '@chakra-ui/react';
import React, { useRef } from 'react';
import { TimeRangeSlider } from '../../form/TimeRangeSlider';
import { CalendarInput } from './CalendarInput';

type CalendarProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const Calendar: React.VFC<CalendarProps> = ({ isOpen, onClose }) => {
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    return (
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="sm">
            <ModalOverlay />
            <ModalContent p={0} my={4}>
                <ModalHeader>Date to view</ModalHeader>
                <ModalCloseButton />
                <ModalBody p={0} mb={4} justifyContent="center">
                    <VStack spacing={4}>
                        <CalendarInput onClose={onClose} />
                        <TimeRangeSlider />
                    </VStack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
