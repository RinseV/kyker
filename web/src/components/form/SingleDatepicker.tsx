import {
    Box,
    Button,
    ButtonProps,
    Divider,
    Heading,
    HStack,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack
} from '@chakra-ui/react';
import { Calendar, DateObj, GetBackForwardPropsOptions, RenderProps } from 'dayzed';
import React, { Fragment } from 'react';

// Source: https://github.com/aboveyunhai/chakra-dayzed-datepicker

interface SingleDatepickerBackButtonsProps {
    calendars: Calendar[];
    getBackProps: (data: GetBackForwardPropsOptions) => ButtonProps;
}

interface SingleDatepickerForwardButtonsProps {
    calendars: Calendar[];
    getForwardProps: (data: GetBackForwardPropsOptions) => ButtonProps;
}

export interface SingleDatepickerProps {
    disabled?: boolean;
    onDateChange: (date: Date) => void;
    id?: string;
    name?: string;
    date: Date;
    configs?: SingleDatepickerConfigs;
}

export interface SingleDatepickerConfigs {
    dateFormat: string;
    monthNames: string[];
    dayNames: string[];
}

const SingleDatepickerBackButtons = (props: SingleDatepickerBackButtonsProps) => {
    const { calendars, getBackProps } = props;
    return (
        <Fragment>
            <Button
                {...getBackProps({
                    calendars,
                    offset: 12
                })}
                variant="ghost"
                size="sm"
            >
                {'<<'}
            </Button>
            <Button {...getBackProps({ calendars })} variant="ghost" size="sm">
                {'<'}
            </Button>
        </Fragment>
    );
};

const SingleDatepickerForwardButtons = (props: SingleDatepickerForwardButtonsProps) => {
    const { calendars, getForwardProps } = props;
    return (
        <Fragment>
            <Button {...getForwardProps({ calendars })} variant="ghost" size="sm">
                {'>'}
            </Button>
            <Button
                {...getForwardProps({
                    calendars,
                    offset: 12
                })}
                variant="ghost"
                size="sm"
            >
                {'>>'}
            </Button>
        </Fragment>
    );
};

export const SingleDatepickerCalendar = (
    props: RenderProps & { configs: SingleDatepickerConfigs }
): JSX.Element | null => {
    const { calendars, getDateProps, getBackProps, getForwardProps, configs } = props;

    const borderColor = useColorModeValue('green.400', 'green.200');
    const bgColor = useColorModeValue('green.200', 'green.400');

    if (calendars.length === 0) {
        return null;
    }

    return (
        <HStack className="datepicker-calendar">
            {calendars.map((calendar) => {
                return (
                    <VStack key={`${calendar.month}${calendar.year}`}>
                        <HStack>
                            <SingleDatepickerBackButtons calendars={calendars} getBackProps={getBackProps} />
                            <Heading size="sm" textAlign="center">
                                {configs.monthNames[calendar.month]} {calendar.year}
                            </Heading>
                            <SingleDatepickerForwardButtons calendars={calendars} getForwardProps={getForwardProps} />
                        </HStack>
                        <Divider />
                        <SimpleGrid columns={7} spacing={2} textAlign="center">
                            {configs.dayNames.map((day) => (
                                <Box key={`${calendar.month}${calendar.year}${day}`}>
                                    <Text fontSize="sm" fontWeight="semibold">
                                        {day}
                                    </Text>
                                </Box>
                            ))}
                            {calendar.weeks.map((week, weekIndex) => {
                                return week.map((dateObj: DateObj | '', index) => {
                                    if (dateObj === '') {
                                        return null;
                                    }
                                    const { date, today, selected } = dateObj;
                                    const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;

                                    return (
                                        <Button
                                            {...getDateProps({
                                                dateObj
                                            })}
                                            key={key}
                                            size="sm"
                                            variant="outline"
                                            borderColor={today ? borderColor : 'transparent'}
                                            bg={selected ? bgColor : undefined}
                                        >
                                            {date.getDate()}
                                        </Button>
                                    );
                                });
                            })}
                        </SimpleGrid>
                    </VStack>
                );
            })}
        </HStack>
    );
};
