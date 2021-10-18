import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    ModalFooter
} from '@chakra-ui/modal';
import { Text } from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import React, { useRef } from 'react';
import { useAnimalsQuery } from '../../../generated/graphql';
import { LegendContent } from './LegendContent';

type LegendProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const Legend: React.VFC<LegendProps> = ({ isOpen, onClose }) => {
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const { data, loading } = useAnimalsQuery();

    return (
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} size="lg">
            <ModalOverlay />
            <ModalContent m={4}>
                <ModalHeader>Legend</ModalHeader>
                <ModalCloseButton ref={initialRef} />
                <ModalBody>{loading ? <Spinner /> : <LegendContent data={data} />}</ModalBody>
                <ModalFooter justifyContent="flex-start">
                    <Text fontSize="sm">* This animal is currently disabled</Text>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
