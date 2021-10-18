import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Flex } from '@chakra-ui/layout';
import { useDayzed } from 'dayzed';
import React from 'react';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import { SingleDatepickerCalendar } from '../../form/SingleDatepicker';

const MONTH_NAMES_DEFAULT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES_DEFAULT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DATE_FORMAT_DEFAULT = 'dd/MM/yyyy';

const configs = {
    dateFormat: DATE_FORMAT_DEFAULT,
    monthNames: MONTH_NAMES_DEFAULT,
    dayNames: DAY_NAMES_DEFAULT
};

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

    // Called when new date is selected
    const onDateSelected = (options: { selectable: boolean; date: Date }) => {
        const { selectable, date } = options;
        if (!selectable) return;
        if (date) {
            onChange(date);
        }
    };

    const dayzedData = useDayzed({
        showOutsideDays: true,
        onDateSelected,
        selected: value
    });

    return (
        <Flex justifyContent="center">
            <FormControl isInvalid={invalid} isDisabled={isDisabled}>
                {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
                <SingleDatepickerCalendar {...dayzedData} configs={configs} />
                <FormErrorMessage>
                    <FormErrorIcon />
                    {error && error.message}
                </FormErrorMessage>
            </FormControl>
        </Flex>
    );
}
