import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Textarea } from '@chakra-ui/textarea';
import React from 'react';
import { Control, FieldValues, Path, PathValue, UnpackNestedValue, useController } from 'react-hook-form';

type DescriptionInputProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>> | undefined;
    label?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    placeholder?: string;
};

export function DescriptionInput<T extends FieldValues = FieldValues>({
    name,
    control,
    defaultValue,
    label,
    isDisabled,
    isRequired,
    placeholder
}: DescriptionInputProps<T>): JSX.Element {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, error }
    } = useController({
        name,
        control,
        rules: {
            required: isRequired ? 'Description is required' : undefined,
            minLength: { value: 2, message: 'Description must contain at least 2 characters' },
            maxLength: { value: 255, message: 'Description must be less than 255 characters' }
        },
        defaultValue
    });

    return (
        <FormControl isInvalid={invalid} isDisabled={isDisabled}>
            {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
            <Textarea
                isRequired={isRequired}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                ref={ref}
            />
            <FormErrorMessage>
                <FormErrorIcon />
                {error && error.message}
            </FormErrorMessage>
        </FormControl>
    );
}
