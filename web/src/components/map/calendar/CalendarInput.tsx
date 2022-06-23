import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { useColorModeValue } from '@chakra-ui/react';
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

    const borderColor = useColorModeValue('green.400', 'green.200');
    const bgColor = useColorModeValue('green.200', 'green.400');
    const focusColor = useColorModeValue('green.500', 'green.200');

    return (
        <FormControl isInvalid={invalid} isDisabled={isDisabled}>
            {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
            <SingleDatepicker
                name="date-input"
                date={value}
                onDateChange={onChange}
                propsConfigs={{
                    dateNavBtnProps: {
                        colorScheme: 'green'
                    },
                    dayOfMonthBtnProps: {
                        defaultBtnProps: {
                            _hover: {
                                background: bgColor,
                                borderColor
                            }
                        },
                        selectedBtnProps: {
                            background: bgColor,
                            borderColor
                        },
                        todayBtnProps: {
                            borderColor
                        }
                    },
                    inputProps: {
                        focusBorderColor: focusColor
                    }
                }}
            />
            <FormErrorMessage>
                <FormErrorIcon />
                {error && error.message}
            </FormErrorMessage>
        </FormControl>
    );
}
