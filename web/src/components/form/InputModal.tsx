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
import { useAppSelector } from '../../store/hooks';
import { getFingerprint } from '../../utils/fingerPrint';
import { format, parse } from 'date-fns';
import * as SpotInput from './SpotInput';

export type FormData = {
    lng: number;
    lat: number;
    animal: {
        label: string;
        value: number;
    };
    description?: string;
    visibility: number;
    traffic: number;
    time: string; // 24h format
};

type InputModalProps = {
    isOpen: boolean;
    onClose: () => void;
    coordinates: LngLat;
    onSuccess: () => void;
    onOfflineSuccess: () => void;
};

export const InputModal: React.VFC<InputModalProps> = ({
    coordinates,
    isOpen,
    onClose,
    onSuccess,
    onOfflineSuccess
}) => {
    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const online = useAppSelector((state) => state.online.online);

    const toast = useToast();

    const [createSpotting] = useCreateSpottingMutation({
        // Refetch spottings on submit
        refetchQueries: [namedOperations.Query.Spottings]
    });

    const {
        control,
        handleSubmit,
        formState: { isSubmitting },
        setError
    } = useForm<FormData>({
        // Set initial values from coordinates since those can't be changed anyways
        defaultValues: {
            lng: coordinates.lng,
            lat: coordinates.lat,
            visibility: 0,
            traffic: 0,
            // Default time is now
            time: format(new Date(), 'HH:mm')
        }
    });

    const onSubmit = async (data: FormData) => {
        // Get browser fingerprint as user ID
        const fingerPrint = await getFingerprint();
        // Check that visibility and traffic ratings are set
        if (data.visibility === 0) {
            setError('visibility', { type: 'required', message: 'Visibility rating is required' });
            return;
        }
        if (data.traffic === 0) {
            setError('traffic', { type: 'required', message: 'Traffic rating is required' });
            return;
        }
        // If we are offline, just add spotting to queue and show success message
        if (!online) {
            // Add mutation to queue
            createSpotting({
                variables: {
                    id: fingerPrint,
                    input: {
                        animal: data.animal.value,
                        description: data.description,
                        lon: data.lng,
                        lat: data.lat,
                        visibility: data.visibility,
                        traffic: data.traffic,
                        createdAt: parse(data.time, 'HH:mm', new Date()).getTime()
                    }
                }
            });
            // Show toast
            onOfflineSuccess();
            onClose();
            return;
        }
        try {
            const response = await createSpotting({
                variables: {
                    id: fingerPrint,
                    input: {
                        animal: data.animal.value,
                        description: data.description,
                        lon: data.lng,
                        lat: data.lat,
                        visibility: data.visibility,
                        traffic: data.traffic,
                        createdAt: parse(data.time, 'HH:mm', new Date()).getTime()
                    }
                }
            });
            if (response.data) {
                onSuccess();
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
                    <SpotInput.SpotInput<FormData>
                        animalName="animal"
                        descriptionName="description"
                        control={control}
                        coordinates={coordinates}
                        visibilityName="visibility"
                        trafficName="traffic"
                        dateName="time"
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
                    <Button onClick={onClose} isDisabled={isSubmitting} ref={initialRef}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
