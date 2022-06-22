import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Select } from 'chakra-react-select';
import React from 'react';
import { Control, FieldValues, Path, RegisterOptions, useController } from 'react-hook-form';

type SearchSelectInputProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    isDisabled?: boolean;
    label?: string;
    rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
} & React.ComponentProps<typeof Select>;

export function SearchSelectInput<T extends FieldValues = FieldValues>({
    name,
    control,
    isDisabled,
    label,
    rules,
    ...props
}: SearchSelectInputProps<T>): JSX.Element {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, error }
    } = useController({ name, control, rules });

    return (
        <FormControl isInvalid={invalid} isDisabled={isDisabled}>
            {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}

            <Select name={name} ref={ref} onChange={onChange} onBlur={onBlur} value={value} {...props} />

            <FormErrorMessage>
                <FormErrorIcon />
                {error && error.message}
            </FormErrorMessage>
        </FormControl>
    );
}
