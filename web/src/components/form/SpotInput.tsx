/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack } from '@chakra-ui/layout';
import { LngLat } from 'mapbox-gl';
import React from 'react';
import { Control, UseFormRegister } from 'react-hook-form';
import { AnimalInput } from './AnimalInput';
import { DescriptionInput } from './DescriptionInput';
import { LocationInput } from './LocationInput';

type SpotInputProps = {
    coordinates: LngLat;
    register: UseFormRegister<any>;
    control: Control<any>;
    isSubmitting?: boolean;
};

export const SpotInput: React.VFC<SpotInputProps> = ({ coordinates, register, control, isSubmitting }) => {
    return (
        <form>
            <Stack spacing={4}>
                {/* Location input (disabled) */}
                <LocationInput coordinates={coordinates} isDisabled />

                {/* Animal search select */}
                <AnimalInput name="animal" control={control} label="Animal" isDisabled={isSubmitting} />

                {/* Description */}
                <DescriptionInput
                    name="description"
                    register={register}
                    label="Description"
                    placeholder="North-West side of the road in a tree"
                    isDisabled={isSubmitting}
                />
            </Stack>
        </form>
    );
};
