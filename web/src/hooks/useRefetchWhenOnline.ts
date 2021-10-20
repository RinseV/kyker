import { ApolloQueryResult } from '@apollo/client';
import { useEffect } from 'react';
import { Exact } from '../generated/graphql';
import { useAppSelector } from '../store/hooks';

// Hook to refetch using given refetch when we are online again
export const useRefetchWhenOnline = (
    refetch: (
        variables?:
            | Partial<
                  Exact<{
                      [key: string]: never;
                  }>
              >
            | undefined
    ) => Promise<ApolloQueryResult<unknown>>
): void => {
    const online = useAppSelector((state) => state.online.online);

    useEffect(() => {
        if (online) {
            refetch();
        }
    }, [online, refetch]);
};
