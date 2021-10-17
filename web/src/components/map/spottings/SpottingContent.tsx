import { Text } from '@chakra-ui/layout';
import React from 'react';
import { SpottingQuery } from '../../../generated/graphql';

type SpottingContentProps = {
    data: SpottingQuery | undefined;
};

export const SpottingContent: React.VFC<SpottingContentProps> = ({ data }) => {
    if (!data) {
        return <Text>Nothing found</Text>;
    }

    return (
        <>
            <Text>{data.spotting.id}</Text>
        </>
    );
};
