import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { Control, FieldValues, Path, PathValue, UnpackNestedValue, useController } from 'react-hook-form';

type TimeInputProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>> | undefined;
    label?: string;
    isDisabled?: boolean;
    isRequired?: boolean;
    placeholder?: string;
};

export function TimeInput<T extends FieldValues = FieldValues>({
    name,
    control,
    defaultValue,
    label,
    isDisabled,
    isRequired
}: TimeInputProps<T>): JSX.Element {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, error }
    } = useController({
        name,
        control,
        rules: {
            required: isRequired ? 'Time is required' : undefined
        },
        defaultValue
    });

    return (
        <FormControl isInvalid={invalid} isDisabled={isDisabled}>
            {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
            <Input ref={ref} type="time" value={value} onChange={onChange} onBlur={onBlur} />
            <FormErrorMessage>
                <FormErrorIcon />
                {error && error.message}
            </FormErrorMessage>
        </FormControl>
    );
}
