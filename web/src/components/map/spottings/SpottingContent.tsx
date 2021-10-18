import { Stack, Text } from '@chakra-ui/layout';
import { formatDistanceToNow } from 'date-fns';
import { LngLat } from 'mapbox-gl';
import React, { useMemo } from 'react';
import { SpottingFragment } from '../../../generated/graphql';
import { LocationInput } from '../../form/LocationInput';

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
                <Text>{timeAgo}</Text>
            </Stack>
        </Stack>
    );
};
