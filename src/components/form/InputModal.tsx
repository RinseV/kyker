import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react';
import { LngLat } from 'mapbox-gl';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { SpotInput } from './SpotInput';

export type FormData = {
    lng: number;
    lat: number;
    animal: {
        label: string;
        value: number;
    };
    description?: string;
};

type InputModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
    coordinates: LngLat;
};

export const InputModal: React.VFC<InputModalProps> = ({ coordinates, isOpen, onOpen, onClose }) => {
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const {
        register,
        control,
        handleSubmit,
        formState: { isSubmitting }
    } = useForm<FormData>({
        // Set initial values from coordinates since those can't be changed anyways
        defaultValues: {
            lng: coordinates.lng,
            lat: coordinates.lat
        }
    });

    // TODO: Submit data to the server
    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent m={4}>
                <ModalHeader>Add a spot</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <form>
                        <SpotInput
                            register={register}
                            control={control}
                            coordinates={coordinates}
                            isSubmitting={isSubmitting}
                        />
                    </form>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="green" mr={3} type="submit" onClick={() => handleSubmit(onSubmit)()}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
