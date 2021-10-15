import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Textarea } from '@chakra-ui/textarea';
import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

type DescriptionInputProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    register: UseFormRegister<T>;
    label?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    placeholder?: string;
};

export function DescriptionInput<T extends FieldValues = FieldValues>({
    name,
    register,
    label,
    isDisabled,
    isRequired,
    placeholder
}: DescriptionInputProps<T>): JSX.Element {
    return (
        <FormControl isDisabled={isDisabled}>
            {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
            <Textarea
                isRequired={isRequired}
                placeholder={placeholder}
                {...register(name, {
                    required: isRequired ? 'Description is required' : undefined,
                    minLength: { value: 2, message: 'Description must contain at least 2 characters' },
                    maxLength: { value: 255, message: 'Description must be less than 255 characters' }
                })}
            />
        </FormControl>
    );
}
