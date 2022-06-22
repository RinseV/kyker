import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex, Stack, Text } from '@chakra-ui/layout';
import { format, formatDistanceToNow, isToday } from 'date-fns';
import { LngLat } from 'mapbox-gl';
import React, { useMemo } from 'react';
import { FaBinoculars, FaCar } from 'react-icons/fa';
import { SpottingFragment } from '../../../generated/graphql';
import { DATE_FORMAT } from '../../../utils/constants';
import { LocationInput } from '../../form/LocationInput';
import { SpottingRating } from './SpottingRating';

type SpottingContentProps = {
    spotting: SpottingFragment | undefined;
};

export const SpottingContent: React.VFC<SpottingContentProps> = ({ spotting }) => {
    const createdAtAsDate = useMemo<Date>(() => {
        return new Date(spotting?.createdAt);
    }, [spotting]);

    // Get amount of time since the spotting was created
    const timeAgo = useMemo<string>(() => {
        if (!spotting || !spotting.createdAt) {
            return 'Unknown';
        }
        const time = formatDistanceToNow(createdAtAsDate, {
            addSuffix: true
        });
        return time.charAt(0).toUpperCase() + time.slice(1);
    }, [createdAtAsDate, spotting]);

    // Get full date since spotting was created
    const fullDate = useMemo<string>(() => {
        if (!spotting || !spotting.createdAt) {
            return 'Unknown';
        }
        const dateFormatted = format(createdAtAsDate, DATE_FORMAT);
        const hoursFormatted = format(createdAtAsDate, 'HH:mm');
        if (!isToday(createdAtAsDate)) {
            // If the date is not today, show the date and time
            return `${dateFormatted} ${hoursFormatted}`;
        } else {
            // If the date is today, show only the time
            return hoursFormatted;
        }
    }, [createdAtAsDate, spotting]);

    const smallTextColor = useColorModeValue('gray.400', 'gray.500');

    if (!spotting) {
        return <Text>Nothing found</Text>;
    }

    return (
        <Stack spacing={8}>
            {/* Location */}
            <LocationInput coordinates={new LngLat(spotting.longitude, spotting.latitude)} labelSize="sm" isDisabled />

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

            {/* Visibility & traffic rating */}
            <Stack
                w="full"
                spacing={2}
                direction={{ base: 'column', sm: 'row' }}
                justifyContent={{ base: undefined, sm: 'space-between' }}
            >
                <SpottingRating value={spotting.visibility || 0} max={3} icon={FaBinoculars} label="Visibility" />
                <SpottingRating value={spotting.traffic || 0} max={3} icon={FaCar} label="Traffic" />
            </Stack>

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
