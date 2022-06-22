import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Flex } from '@chakra-ui/layout';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type CalenderInputProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    isDisabled?: boolean;
};

export function CalendarInput<T extends FieldValues = FieldValues>({
    name,
    control,
    label,
    isDisabled
}: CalenderInputProps<T>): JSX.Element {
    const {
        field: { onChange, value },
        fieldState: { invalid, error }
    } = useController({ name, control });

    return (
        <Flex justifyContent="center">
            <FormControl isInvalid={invalid} isDisabled={isDisabled}>
                {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
                <SingleDatepicker
                    name="date-input"
                    date={value}
                    onDateChange={onChange}
                    propsConfigs={{
                        dateNavBtnProps: {
                            colorScheme: 'green'
                        }
                    }}
                />
                <FormErrorMessage>
                    <FormErrorIcon />
                    {error && error.message}
                </FormErrorMessage>
            </FormControl>
        </Flex>
    );
}
