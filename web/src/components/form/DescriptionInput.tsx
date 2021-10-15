/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Textarea } from '@chakra-ui/textarea';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type DescriptionInputProps = {
    name: string;
    register: UseFormRegister<any>;
    label?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    placeholder?: string;
};

export const DescriptionInput: React.VFC<DescriptionInputProps> = ({
    name,
    register,
    label,
    isDisabled,
    isRequired,
    placeholder
}) => {
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
};
