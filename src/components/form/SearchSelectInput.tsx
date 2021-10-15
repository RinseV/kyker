import React from 'react';
import { Control, RegisterOptions, useController } from 'react-hook-form';
import { Select } from 'chakra-react-select';
import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';

type SearchSelectInputProps = {
    name: string;
    control: Control<any>;
    isDisabled?: boolean;
    label?: string;
    rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
} & React.ComponentProps<typeof Select>;

export const SearchSelectInput: React.VFC<SearchSelectInputProps> = ({
    name,
    control,
    isDisabled,
    label,
    rules,
    ...props
}) => {
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
};
