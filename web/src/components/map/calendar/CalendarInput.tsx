import { Flex } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import { useDayzed } from 'dayzed';
import lodash_isNil from 'lodash/isNil';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setQueryDate } from '../../../store/reducers/preference.slice';
import { SingleDatepickerCalendar } from '../../form/SingleDatepicker';

const MONTH_NAMES_DEFAULT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAY_NAMES_DEFAULT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const DATE_FORMAT_DEFAULT = 'dd/MM/yyyy';

const configs = {
    dateFormat: DATE_FORMAT_DEFAULT,
    monthNames: MONTH_NAMES_DEFAULT,
    dayNames: DAY_NAMES_DEFAULT
};

type CalenderInputProps = {
    onClose: () => void;
};

export const CalendarInput: React.VFC<CalenderInputProps> = ({ onClose }) => {
    // Selected date (as timestamp)
    const date = useAppSelector((state) => state.preferences.queryDate);
    const dispatch = useAppDispatch();

    const toast = useToast();

    // Called when new date is selected
    const onDateSelected = (options: { selectable: boolean; date: Date }) => {
        const { selectable, date } = options;
        if (!selectable) return;
        if (!lodash_isNil(date)) {
            // Update timestamp in store
            dispatch(setQueryDate(date));
            toast({
                title: 'Date changed',
                description: `Date changed to ${date.toLocaleDateString()}`,
                status: 'info',
                duration: 5000,
                isClosable: true
            });
            onClose();
            return;
        }
    };

    const dayzedData = useDayzed({
        showOutsideDays: true,
        onDateSelected,
        selected: new Date(date)
    });

    return (
        <Flex justifyContent="center">
            <SingleDatepickerCalendar {...dayzedData} configs={configs} />
        </Flex>
    );
};
