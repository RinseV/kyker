import { FormControl, FormErrorIcon, FormErrorMessage, FormLabel } from '@chakra-ui/form-control';
import { Flex, Text } from '@chakra-ui/layout';
import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/slider';
import { Control, FieldValues, Path, useController } from 'react-hook-form';

type TimeRangeSliderProps<T extends FieldValues = FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label?: string;
    isDisabled?: boolean;
};

// Converts the amount of minutes from midnight to HH:mm format
export const minutesToTime = (minutes: number): string => {
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

export const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':');
    return parseInt(hours) * 60 + parseInt(minutes);
};

export function TimeRangeSlider<T extends FieldValues = FieldValues>({
    name,
    control,
    label,
    isDisabled
}: TimeRangeSliderProps<T>): JSX.Element {
    const {
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, error }
    } = useController({ name, control });

    return (
        <FormControl w="full" isInvalid={invalid} isDisabled={isDisabled}>
            {label ? <FormLabel htmlFor={name}>{label}</FormLabel> : null}
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
                    onChange={onChange}
                    onBlur={onBlur}
                    ref={ref}
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
            <FormErrorMessage>
                <FormErrorIcon />
                {error && error.message}
            </FormErrorMessage>
        </FormControl>
    );
}
