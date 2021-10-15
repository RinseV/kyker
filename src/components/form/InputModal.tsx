import { ApolloError } from '@apollo/client';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast
} from '@chakra-ui/react';
import { LngLat } from 'mapbox-gl';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { namedOperations, useCreateSpottingMutation } from '../../generated/graphql';
import { getFingerprint } from '../../utils/fingerPrint';
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
    onSuccess: () => void;
};

export const InputModal: React.VFC<InputModalProps> = ({ coordinates, isOpen, onOpen, onClose, onSuccess }) => {
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const toast = useToast();

    const [createSpotting] = useCreateSpottingMutation({
        // Refetch spottings on submit
        refetchQueries: [namedOperations.Query.Spottings]
    });

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
    const onSubmit = async (data: FormData) => {
        console.log(data);
        // Get browser fingerprint as user ID
        const fingerPrint = await getFingerprint();
        console.log(`Fingerprint: ${fingerPrint}`);
        // await new Promise((resolve) => {
        //     setTimeout(resolve, 1000);
        // });
        try {
            const response = await createSpotting({
                variables: {
                    id: fingerPrint,
                    input: {
                        animal: data.animal.value,
                        description: data.description,
                        lon: data.lng,
                        lat: data.lat
                    }
                }
            });
            if (response.data) {
                toast({
                    title: 'Spot added',
                    description: 'The spot has been added to the map',
                    status: 'success',
                    duration: 5000,
                    isClosable: true
                });
                onSuccess();
                // TODO: navigate? update cache?
            }
        } catch (e) {
            const error = e as ApolloError;
            console.error(error);
            toast({
                title: 'Error',
                description: 'Something went wrong',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
        onClose();
    };

    return (
        <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent m={4}>
                <ModalHeader>Add a spot</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <SpotInput
                        register={register}
                        control={control}
                        coordinates={coordinates}
                        isSubmitting={isSubmitting}
                    />
                </ModalBody>

                <ModalFooter>
                    <Button
                        colorScheme="green"
                        mr={3}
                        type="submit"
                        onClick={() => handleSubmit(onSubmit)()}
                        isLoading={isSubmitting}
                    >
                        Save
                    </Button>
                    <Button onClick={onClose} isDisabled={isSubmitting}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
