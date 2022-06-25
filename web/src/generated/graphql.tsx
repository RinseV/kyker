import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
    DateTime: any;
};

export type Animal = {
    __typename?: 'Animal';
    createdAt: Scalars['DateTime'];
    darkColor: Scalars['String'];
    disabled: Scalars['Boolean'];
    id: Scalars['String'];
    lightColor: Scalars['String'];
    name: Scalars['String'];
    updatedAt: Scalars['DateTime'];
};

export type Camp = {
    __typename?: 'Camp';
    createdAt: Scalars['DateTime'];
    id: Scalars['String'];
    latitude: Scalars['Float'];
    longitude: Scalars['Float'];
    name: Scalars['String'];
    size: CampSize;
    updatedAt: Scalars['DateTime'];
};

export enum CampSize {
    Bush = 'BUSH',
    Picnic = 'PICNIC',
    Rest = 'REST',
    Satellite = 'SATELLITE'
}

export type CreateSpottingInput = {
    animalId: Scalars['String'];
    createdAt?: InputMaybe<Scalars['DateTime']>;
    description?: InputMaybe<Scalars['String']>;
    latitude: Scalars['Float'];
    longitude: Scalars['Float'];
    traffic: Scalars['Int'];
    userIdentifier: Scalars['String'];
    visibility: Scalars['Int'];
};

export type Gate = {
    __typename?: 'Gate';
    createdAt: Scalars['DateTime'];
    id: Scalars['String'];
    latitude: Scalars['Float'];
    longitude: Scalars['Float'];
    name: Scalars['String'];
    updatedAt: Scalars['DateTime'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createSpotting: Spotting;
};

export type MutationCreateSpottingArgs = {
    input: CreateSpottingInput;
};

export type PageInfo = {
    __typename?: 'PageInfo';
    hasNextPage: Scalars['Boolean'];
    hasPreviousPage: Scalars['Boolean'];
    totalCount: Scalars['Int'];
};

export type PaginatedSpottings = {
    __typename?: 'PaginatedSpottings';
    nodes: Array<Spotting>;
    pageInfo: PageInfo;
};

export type Query = {
    __typename?: 'Query';
    animals: Array<Animal>;
    camps: Array<Camp>;
    gates: Array<Gate>;
    spotting?: Maybe<Spotting>;
    spottings: PaginatedSpottings;
};

export type QuerySpottingArgs = {
    id: Scalars['String'];
};

export type QuerySpottingsArgs = {
    filter: SpottingsFilter;
    orderBy?: InputMaybe<SpottingsOrderBy>;
    paginationInput?: InputMaybe<SpottingsPaginationInput>;
};

/** Sort direction */
export enum Sort {
    Asc = 'asc',
    Desc = 'desc'
}

export type Spotting = {
    __typename?: 'Spotting';
    animal: Animal;
    createdAt: Scalars['DateTime'];
    description?: Maybe<Scalars['String']>;
    distance?: Maybe<Scalars['Float']>;
    id: Scalars['String'];
    latitude: Scalars['Float'];
    longitude: Scalars['Float'];
    traffic?: Maybe<Scalars['Int']>;
    updatedAt: Scalars['DateTime'];
    visibility?: Maybe<Scalars['Int']>;
};

export type SpottingsFilter = {
    animals?: InputMaybe<Array<Scalars['String']>>;
    date?: InputMaybe<Scalars['String']>;
    endHour?: InputMaybe<Scalars['String']>;
    excludeAnimals?: InputMaybe<Array<Scalars['String']>>;
    startHour?: InputMaybe<Scalars['String']>;
};

export type SpottingsOrderBy = {
    date?: InputMaybe<Sort>;
    nearby?: InputMaybe<SpottingsOrderNearby>;
};

export type SpottingsOrderNearby = {
    latitude: Scalars['Float'];
    longitude: Scalars['Float'];
    nearby: Sort;
};

export type SpottingsPaginationInput = {
    limit?: InputMaybe<Scalars['Int']>;
    offset?: InputMaybe<Scalars['Int']>;
};

export type AnimalFragment = {
    __typename?: 'Animal';
    id: string;
    name: string;
    disabled: boolean;
    lightColor: string;
    darkColor: string;
};

export type CampFragment = {
    __typename?: 'Camp';
    id: string;
    name: string;
    size: CampSize;
    latitude: number;
    longitude: number;
};

export type GateFragment = { __typename?: 'Gate'; id: string; name: string; latitude: number; longitude: number };

export type PageInfoFragment = {
    __typename?: 'PageInfo';
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
};

export type SpottingFragment = {
    __typename?: 'Spotting';
    id: string;
    description?: string | null;
    latitude: number;
    longitude: number;
    visibility?: number | null;
    traffic?: number | null;
    distance?: number | null;
    createdAt: any;
    updatedAt: any;
    animal: {
        __typename?: 'Animal';
        id: string;
        name: string;
        disabled: boolean;
        lightColor: string;
        darkColor: string;
    };
};

export type SpottingExtendedFragment = {
    __typename?: 'Spotting';
    description?: string | null;
    id: string;
    latitude: number;
    longitude: number;
    visibility?: number | null;
    traffic?: number | null;
    distance?: number | null;
    createdAt: any;
    updatedAt: any;
    animal: {
        __typename?: 'Animal';
        id: string;
        name: string;
        disabled: boolean;
        lightColor: string;
        darkColor: string;
    };
};

export type CreateSpottingMutationVariables = Exact<{
    input: CreateSpottingInput;
}>;

export type CreateSpottingMutation = {
    __typename?: 'Mutation';
    createSpotting: {
        __typename?: 'Spotting';
        description?: string | null;
        id: string;
        latitude: number;
        longitude: number;
        visibility?: number | null;
        traffic?: number | null;
        distance?: number | null;
        createdAt: any;
        updatedAt: any;
        animal: {
            __typename?: 'Animal';
            id: string;
            name: string;
            disabled: boolean;
            lightColor: string;
            darkColor: string;
        };
    };
};

export type AnimalsQueryVariables = Exact<{ [key: string]: never }>;

export type AnimalsQuery = {
    __typename?: 'Query';
    animals: Array<{
        __typename?: 'Animal';
        id: string;
        name: string;
        disabled: boolean;
        lightColor: string;
        darkColor: string;
    }>;
};

export type CampsQueryVariables = Exact<{ [key: string]: never }>;

export type CampsQuery = {
    __typename?: 'Query';
    camps: Array<{
        __typename?: 'Camp';
        id: string;
        name: string;
        size: CampSize;
        latitude: number;
        longitude: number;
    }>;
};

export type GatesQueryVariables = Exact<{ [key: string]: never }>;

export type GatesQuery = {
    __typename?: 'Query';
    gates: Array<{ __typename?: 'Gate'; id: string; name: string; latitude: number; longitude: number }>;
};

export type SpottingQueryVariables = Exact<{
    id: Scalars['String'];
}>;

export type SpottingQuery = {
    __typename?: 'Query';
    spotting?: {
        __typename?: 'Spotting';
        description?: string | null;
        id: string;
        latitude: number;
        longitude: number;
        visibility?: number | null;
        traffic?: number | null;
        distance?: number | null;
        createdAt: any;
        updatedAt: any;
        animal: {
            __typename?: 'Animal';
            id: string;
            name: string;
            disabled: boolean;
            lightColor: string;
            darkColor: string;
        };
    } | null;
};

export type SpottingsQueryVariables = Exact<{
    filter: SpottingsFilter;
}>;

export type SpottingsQuery = {
    __typename?: 'Query';
    spottings: {
        __typename?: 'PaginatedSpottings';
        nodes: Array<{
            __typename?: 'Spotting';
            id: string;
            description?: string | null;
            latitude: number;
            longitude: number;
            visibility?: number | null;
            traffic?: number | null;
            distance?: number | null;
            createdAt: any;
            updatedAt: any;
            animal: {
                __typename?: 'Animal';
                id: string;
                name: string;
                disabled: boolean;
                lightColor: string;
                darkColor: string;
            };
        }>;
        pageInfo: { __typename?: 'PageInfo'; totalCount: number; hasNextPage: boolean; hasPreviousPage: boolean };
    };
};

export const CampFragmentDoc = gql`
    fragment Camp on Camp {
        id
        name
        size
        latitude
        longitude
    }
`;
export const GateFragmentDoc = gql`
    fragment Gate on Gate {
        id
        name
        latitude
        longitude
    }
`;
export const PageInfoFragmentDoc = gql`
    fragment PageInfo on PageInfo {
        totalCount
        hasNextPage
        hasPreviousPage
    }
`;
export const AnimalFragmentDoc = gql`
    fragment Animal on Animal {
        id
        name
        disabled
        lightColor
        darkColor
    }
`;
export const SpottingFragmentDoc = gql`
    fragment Spotting on Spotting {
        id
        animal {
            ...Animal
        }
        description
        latitude
        longitude
        visibility
        traffic
        distance
        createdAt
        updatedAt
    }
    ${AnimalFragmentDoc}
`;
export const SpottingExtendedFragmentDoc = gql`
    fragment SpottingExtended on Spotting {
        ...Spotting
        description
    }
    ${SpottingFragmentDoc}
`;
export const CreateSpottingDocument = gql`
    mutation CreateSpotting($input: CreateSpottingInput!) {
        createSpotting(input: $input) {
            ...SpottingExtended
        }
    }
    ${SpottingExtendedFragmentDoc}
`;
export type CreateSpottingMutationFn = Apollo.MutationFunction<CreateSpottingMutation, CreateSpottingMutationVariables>;

/**
 * __useCreateSpottingMutation__
 *
 * To run a mutation, you first call `useCreateSpottingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSpottingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSpottingMutation, { data, loading, error }] = useCreateSpottingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSpottingMutation(
    baseOptions?: Apollo.MutationHookOptions<CreateSpottingMutation, CreateSpottingMutationVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<CreateSpottingMutation, CreateSpottingMutationVariables>(CreateSpottingDocument, options);
}
export type CreateSpottingMutationHookResult = ReturnType<typeof useCreateSpottingMutation>;
export type CreateSpottingMutationResult = Apollo.MutationResult<CreateSpottingMutation>;
export type CreateSpottingMutationOptions = Apollo.BaseMutationOptions<
    CreateSpottingMutation,
    CreateSpottingMutationVariables
>;
export const AnimalsDocument = gql`
    query Animals {
        animals {
            ...Animal
        }
    }
    ${AnimalFragmentDoc}
`;

/**
 * __useAnimalsQuery__
 *
 * To run a query within a React component, call `useAnimalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnimalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnimalsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAnimalsQuery(baseOptions?: Apollo.QueryHookOptions<AnimalsQuery, AnimalsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<AnimalsQuery, AnimalsQueryVariables>(AnimalsDocument, options);
}
export function useAnimalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AnimalsQuery, AnimalsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<AnimalsQuery, AnimalsQueryVariables>(AnimalsDocument, options);
}
export type AnimalsQueryHookResult = ReturnType<typeof useAnimalsQuery>;
export type AnimalsLazyQueryHookResult = ReturnType<typeof useAnimalsLazyQuery>;
export type AnimalsQueryResult = Apollo.QueryResult<AnimalsQuery, AnimalsQueryVariables>;
export const CampsDocument = gql`
    query Camps {
        camps {
            ...Camp
        }
    }
    ${CampFragmentDoc}
`;

/**
 * __useCampsQuery__
 *
 * To run a query within a React component, call `useCampsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCampsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCampsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCampsQuery(baseOptions?: Apollo.QueryHookOptions<CampsQuery, CampsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<CampsQuery, CampsQueryVariables>(CampsDocument, options);
}
export function useCampsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CampsQuery, CampsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<CampsQuery, CampsQueryVariables>(CampsDocument, options);
}
export type CampsQueryHookResult = ReturnType<typeof useCampsQuery>;
export type CampsLazyQueryHookResult = ReturnType<typeof useCampsLazyQuery>;
export type CampsQueryResult = Apollo.QueryResult<CampsQuery, CampsQueryVariables>;
export const GatesDocument = gql`
    query Gates {
        gates {
            ...Gate
        }
    }
    ${GateFragmentDoc}
`;

/**
 * __useGatesQuery__
 *
 * To run a query within a React component, call `useGatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGatesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGatesQuery(baseOptions?: Apollo.QueryHookOptions<GatesQuery, GatesQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<GatesQuery, GatesQueryVariables>(GatesDocument, options);
}
export function useGatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GatesQuery, GatesQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<GatesQuery, GatesQueryVariables>(GatesDocument, options);
}
export type GatesQueryHookResult = ReturnType<typeof useGatesQuery>;
export type GatesLazyQueryHookResult = ReturnType<typeof useGatesLazyQuery>;
export type GatesQueryResult = Apollo.QueryResult<GatesQuery, GatesQueryVariables>;
export const SpottingDocument = gql`
    query Spotting($id: String!) {
        spotting(id: $id) {
            ...SpottingExtended
        }
    }
    ${SpottingExtendedFragmentDoc}
`;

/**
 * __useSpottingQuery__
 *
 * To run a query within a React component, call `useSpottingQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpottingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpottingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSpottingQuery(baseOptions: Apollo.QueryHookOptions<SpottingQuery, SpottingQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<SpottingQuery, SpottingQueryVariables>(SpottingDocument, options);
}
export function useSpottingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SpottingQuery, SpottingQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<SpottingQuery, SpottingQueryVariables>(SpottingDocument, options);
}
export type SpottingQueryHookResult = ReturnType<typeof useSpottingQuery>;
export type SpottingLazyQueryHookResult = ReturnType<typeof useSpottingLazyQuery>;
export type SpottingQueryResult = Apollo.QueryResult<SpottingQuery, SpottingQueryVariables>;
export const SpottingsDocument = gql`
    query Spottings($filter: SpottingsFilter!) {
        spottings(filter: $filter) {
            nodes {
                ...Spotting
            }
            pageInfo {
                ...PageInfo
            }
        }
    }
    ${SpottingFragmentDoc}
    ${PageInfoFragmentDoc}
`;

/**
 * __useSpottingsQuery__
 *
 * To run a query within a React component, call `useSpottingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpottingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpottingsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useSpottingsQuery(baseOptions: Apollo.QueryHookOptions<SpottingsQuery, SpottingsQueryVariables>) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<SpottingsQuery, SpottingsQueryVariables>(SpottingsDocument, options);
}
export function useSpottingsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<SpottingsQuery, SpottingsQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<SpottingsQuery, SpottingsQueryVariables>(SpottingsDocument, options);
}
export type SpottingsQueryHookResult = ReturnType<typeof useSpottingsQuery>;
export type SpottingsLazyQueryHookResult = ReturnType<typeof useSpottingsLazyQuery>;
export type SpottingsQueryResult = Apollo.QueryResult<SpottingsQuery, SpottingsQueryVariables>;
export const namedOperations = {
    Query: {
        Animals: 'Animals',
        Camps: 'Camps',
        Gates: 'Gates',
        Spotting: 'Spotting',
        Spottings: 'Spottings'
    },
    Mutation: {
        CreateSpotting: 'CreateSpotting'
    },
    Fragment: {
        Animal: 'Animal',
        Camp: 'Camp',
        Gate: 'Gate',
        PageInfo: 'PageInfo',
        Spotting: 'Spotting',
        SpottingExtended: 'SpottingExtended'
    }
};
