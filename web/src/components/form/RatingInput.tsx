import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import { Control, FieldValues, Path, PathValue, UnpackNestedValue, useController } from 'react-hook-form';
import { IconType } from 'react-icons/lib';
import { StarsInput } from './StarsInput';

type RatingInputProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    defaultValue?: UnpackNestedValue<PathValue<T, Path<T>>> | undefined;
    label?: string;
    icon: IconType;
    isDisabled?: boolean;
    isRequired?: boolean;
};

export function RatingInput<T extends FieldValues = FieldValues>({
    name,
    control,
    defaultValue,
    label,
    icon,
    isDisabled,
    isRequired
}: RatingInputProps<T>): JSX.Element {
    const {
        field: { onChange, value },
        fieldState: { invalid, error }
    } = useController({
        name,
        control,
        rules: {
            required: isRequired ? 'Rating is required' : undefined
        },
        defaultValue
    });

    return (
        <FormControl isInvalid={invalid} isDisabled={isDisabled}>
            {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
            <StarsInput<T> icon={icon} max={3} label={label?.toLowerCase() ?? ''} value={value} onChange={onChange} />
            <FormErrorMessage>
                <FormErrorIcon />
                {error && error.message}
            </FormErrorMessage>
        </FormControl>
    );
}
