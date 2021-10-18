import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Flex, Text } from '@chakra-ui/layout';
import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/slider';
import { format } from 'date-fns';
import React from 'react';

// Converts the amount of minutes from midnight to HH:mm format
const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const minutesRemaining = minutes % 60;
    let hoursAsString = hours.toString();
    let minutesAsString = minutesRemaining.toString();
    // Add leading zero if needed
    if (minutesRemaining < 10) {
        minutesAsString = `0${minutesRemaining}`;
    }
    // Add leading zero if needed
    if (hours < 10) {
        hoursAsString = `0${hours}`;
    }
    return `${hoursAsString}:${minutesAsString}`;
};

// Converts HH:mm format to amount of minutes from midnight
const timeToMinutes = (time: string): number => {
    // Split on hours and minutes
    const [hours, minutes] = time.split(':');
    // Convert to amount of minutes
    return parseInt(hours) * 60 + parseInt(minutes);
};

export const TimeRangeSlider: React.VFC = () => {
    // Get current time in amount of minutes from 0:00
    const currentTime = format(new Date(), 'HH:mm');
    // Default is entire day
    const [value, setValue] = React.useState<number[]>([0, 1439]);

    const handleChange = (value: number[]) => {
        setValue(value);
    };

    // TODO: react-hook-form

    return (
        <FormControl p={4} w="full" direction="column">
            <FormLabel>Time window (current time: {currentTime})</FormLabel>
            <Flex pt={8} px={4}>
                <RangeSlider
                    aria-label={['start', 'end']}
                    colorScheme="green"
                    // 00:00 is 0
                    min={0}
                    // 23:59 is 1439 minutes
                    max={1439}
                    // Steps of 30 minutes
                    step={30}
                    // Hour window
                    minStepsBetweenThumbs={2}
                    value={value}
                    onChange={handleChange}
                >
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    {/* Array with 0, ..., value.length */}
                    {Array.from({ length: value.length }, (_, index) => index).map((i) => (
                        <RangeSliderThumb key={i} index={i}>
                            <Text fontSize="sm" mb={12}>
                                {minutesToTime(value[i])}
                            </Text>
                        </RangeSliderThumb>
                    ))}
                </RangeSlider>
            </Flex>
        </FormControl>
    );
};
