import { Stack } from '@chakra-ui/layout';
import { LngLat } from 'mapbox-gl';
import React from 'react';
import { Control, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { AnimalInput } from './AnimalInput';
import { DescriptionInput } from './DescriptionInput';
import { LocationInput } from './LocationInput';

type SpotInputProps<T extends FieldValues = FieldValues> = {
    animalName: Path<T>;
    descriptionName: Path<T>;
    coordinates: LngLat;
    register: UseFormRegister<T>;
    control: Control<T>;
    isSubmitting?: boolean;
};

export function SpotInput<T extends FieldValues = FieldValues>({
    animalName,
    descriptionName,
    coordinates,
    register,
    control,
    isSubmitting
}: SpotInputProps<T>): JSX.Element {
    return (
        <form>
            <Stack spacing={4}>
                {/* Location input (disabled) */}
                <LocationInput coordinates={coordinates} isDisabled />

                {/* Animal search select */}
                <AnimalInput<T> name={animalName} control={control} label="Animal" isDisabled={isSubmitting} />

                {/* Description */}
                <DescriptionInput<T>
                    name={descriptionName}
                    register={register}
                    label="Description"
                    placeholder="North-West side of the road in a tree"
                    isDisabled={isSubmitting}
                />
            </Stack>
        </form>
    );
}
