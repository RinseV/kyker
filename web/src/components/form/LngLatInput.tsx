import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type LngLatInputProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    register?: UseFormRegister<T>;
    defaultValue?: number;
    isDisabled?: boolean;
    label?: string;
    placeholder?: string;
};

export function LngLatInput<T extends FieldValues = FieldValues>({
    name,
    register,
    defaultValue,
    isDisabled,
    label,
    placeholder
}: LngLatInputProps<T>): JSX.Element {
    return (
        <FormControl isDisabled={isDisabled}>
            {label ? (
                <FormLabel htmlFor={name} fontSize="sm">
                    {label}
                </FormLabel>
            ) : null}
            {register ? (
                <Input
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    {...register(name, { required: 'Coordinate is required' })}
                />
            ) : (
                <Input placeholder={placeholder} defaultValue={defaultValue} />
            )}
        </FormControl>
    );
}
