import { FormLabel } from '@chakra-ui/form-control';
import { Flex, HStack } from '@chakra-ui/layout';
import { LngLat } from 'mapbox-gl';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormData } from './InputModal';
import { LngLatInput } from './LngLatInput';

type LocationInputProps = {
    coordinates: LngLat;
    register?: UseFormRegister<FormData>;
    isDisabled?: boolean;
};

export const LocationInput: React.VFC<LocationInputProps> = ({ coordinates, register, isDisabled }) => {
    return (
        <Flex direction="column">
            <FormLabel>Location</FormLabel>
            <HStack spacing={4} w="full">
                {/* Longitude */}
                <LngLatInput
                    name="lng"
                    register={register}
                    defaultValue={coordinates.lng}
                    placeholder="31.5896973"
                    isDisabled={isDisabled}
                    label="Longitude"
                />

                {/* Latitude */}
                <LngLatInput
                    name="lat"
                    register={register}
                    defaultValue={coordinates.lat}
                    placeholder="-24.9964431"
                    isDisabled={isDisabled}
                    label="Latitude"
                />
            </HStack>
        </Flex>
    );
};
