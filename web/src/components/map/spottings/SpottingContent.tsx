import { Flex, Stack, Text } from '@chakra-ui/layout';
import { format, formatDistanceToNow, isToday } from 'date-fns';
import { LngLat } from 'mapbox-gl';
import React, { useMemo } from 'react';
import { SpottingFragment } from '../../../generated/graphql';
import { LocationInput } from '../../form/LocationInput';
import { DATE_FORMAT } from '../../../utils/constants';
import { useColorModeValue } from '@chakra-ui/color-mode';

type SpottingContentProps = {
    spotting: SpottingFragment | undefined;
};

export const SpottingContent: React.VFC<SpottingContentProps> = ({ spotting }) => {
    // Get amount of time since the spotting was created
    const timeAgo = useMemo<string>(() => {
        if (!spotting || !spotting.createdAt) {
            return 'Unknown';
        }
        const time = formatDistanceToNow(new Date(spotting.createdAt), {
            addSuffix: true
        });
        return time.charAt(0).toUpperCase() + time.slice(1);
    }, [spotting]);

    // Get full date since spotting was created
    const fullDate = useMemo<string>(() => {
        if (!spotting || !spotting.createdAt) {
            return 'Unknown';
        }
        const dateFormatted = format(spotting.createdAt, DATE_FORMAT);
        const hoursFormatted = format(spotting.createdAt, 'HH:mm');
        if (!isToday(spotting.createdAt)) {
            // If the date is not today, show the date and time
            return `${dateFormatted} ${hoursFormatted}`;
        } else {
            // If the date is today, show only the time
            return hoursFormatted;
        }
    }, [spotting]);

    const smallTextColor = useColorModeValue('gray.400', 'gray.500');

    if (!spotting) {
        return <Text>Nothing found</Text>;
    }

    return (
        <Stack spacing={8}>
            {/* Location */}
            <LocationInput
                coordinates={new LngLat(spotting.location.lon, spotting.location.lat)}
                labelSize="sm"
                isDisabled
            />

            {/* Animal */}
            <Stack spacing={2}>
                <Text fontSize="sm">Animal</Text>
                <Text>{spotting.animal.name}</Text>
            </Stack>

            {/* Description (if any) */}
            {spotting.description && (
                <Stack spacing={2}>
                    <Text fontSize="sm">Description</Text>
                    <Text>{spotting.description}</Text>
                </Stack>
            )}

            {/* Date (time ago) */}
            <Stack spacing={2}>
                <Text fontSize="sm">Sighted</Text>
                <Flex justifyContent="space-between" alignItems="flex-end">
                    <Text>{timeAgo}</Text>
                    <Text fontSize="sm" color={smallTextColor}>
                        {fullDate}
                    </Text>
                </Flex>
            </Stack>
        </Stack>
    );
};
