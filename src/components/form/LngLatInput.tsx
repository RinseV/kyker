import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type LngLatInputProps = {
    name: string;
    register?: UseFormRegister<any>;
    defaultValue?: number;
    isDisabled?: boolean;
    label?: string;
    placeholder?: string;
};

export const LngLatInput: React.VFC<LngLatInputProps> = ({
    name,
    register,
    defaultValue,
    isDisabled,
    label,
    placeholder
}) => {
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
};
