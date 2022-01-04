import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
    Timestamp: any;
};

export type Animal = {
    __typename?: 'Animal';
    color: Color;
    createdAt: Scalars['Timestamp'];
    disabled: Scalars['Boolean'];
    id: Scalars['Int'];
    name: Scalars['String'];
    updatedAt: Scalars['Timestamp'];
};

export type Camp = {
    __typename?: 'Camp';
    createdAt: Scalars['Timestamp'];
    id: Scalars['Int'];
    location: Location;
    name: Scalars['String'];
    size: CampSize;
    updatedAt: Scalars['Timestamp'];
};

/** Camp size */
export enum CampSize {
    Bush = 'BUSH',
    Picnic = 'PICNIC',
    Rest = 'REST',
    Sattelite = 'SATTELITE'
}

export type Color = {
    __typename?: 'Color';
    dark: Scalars['String'];
    light: Scalars['String'];
};

export type Gate = {
    __typename?: 'Gate';
    createdAt: Scalars['Timestamp'];
    id: Scalars['Int'];
    location: Location;
    name: Scalars['String'];
    updatedAt: Scalars['Timestamp'];
};

export type Hours = {
    end: Scalars['String'];
    start: Scalars['String'];
};

export type Location = {
    __typename?: 'Location';
    lat: Scalars['Float'];
    lon: Scalars['Float'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createSpotting: Spotting;
};

export type MutationCreateSpottingArgs = {
    id: Scalars['String'];
    input: SpottingValidator;
};

export type Query = {
    __typename?: 'Query';
    animals: Array<Animal>;
    camps: Array<Camp>;
    gates: Array<Gate>;
    spotting: Spotting;
    spottings: Array<Spotting>;
};

export type QuerySpottingArgs = {
    id: Scalars['Int'];
};

export type QuerySpottingsArgs = {
    animals?: InputMaybe<Array<Scalars['Int']>>;
    date?: InputMaybe<QueryDate>;
    excludedAnimals?: InputMaybe<Array<Scalars['Int']>>;
    hours?: InputMaybe<Hours>;
};

export type QueryDate = {
    date: Scalars['String'];
};

export type Spotting = {
    __typename?: 'Spotting';
    animal: Animal;
    createdAt: Scalars['Timestamp'];
    description?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    imageId?: Maybe<Scalars['String']>;
    location: Location;
    traffic?: Maybe<Scalars['Int']>;
    updatedAt: Scalars['Timestamp'];
    user: User;
    visibility?: Maybe<Scalars['Int']>;
};

export type SpottingValidator = {
    animal: Scalars['Int'];
    createdAt?: InputMaybe<Scalars['Timestamp']>;
    description?: InputMaybe<Scalars['String']>;
    lat: Scalars['Float'];
    lon: Scalars['Float'];
    traffic: Scalars['Int'];
    visibility: Scalars['Int'];
};

export type User = {
    __typename?: 'User';
    createdAt: Scalars['Timestamp'];
    id: Scalars['ID'];
    spottings: Array<Spotting>;
    updatedAt: Scalars['Timestamp'];
};

export type AnimalFragment = {
    __typename?: 'Animal';
    id: number;
    name: string;
    disabled: boolean;
    color: { __typename?: 'Color'; light: string; dark: string };
};

export type CampFragment = {
    __typename?: 'Camp';
    id: number;
    name: string;
    size: CampSize;
    location: { __typename?: 'Location'; lon: number; lat: number };
};

export type GateFragment = {
    __typename?: 'Gate';
    id: number;
    name: string;
    location: { __typename?: 'Location'; lon: number; lat: number };
};

export type SpottingFragment = {
    __typename?: 'Spotting';
    id: number;
    description?: string | null | undefined;
    visibility?: number | null | undefined;
    traffic?: number | null | undefined;
    createdAt: any;
    animal: {
        __typename?: 'Animal';
        id: number;
        name: string;
        disabled: boolean;
        color: { __typename?: 'Color'; light: string; dark: string };
    };
    location: { __typename?: 'Location'; lon: number; lat: number };
};

export type SpottingExtendedFragment = {
    __typename?: 'Spotting';
    id: number;
    description?: string | null | undefined;
    visibility?: number | null | undefined;
    traffic?: number | null | undefined;
    animal: {
        __typename?: 'Animal';
        id: number;
        name: string;
        disabled: boolean;
        color: { __typename?: 'Color'; light: string; dark: string };
    };
    location: { __typename?: 'Location'; lon: number; lat: number };
};

export type CreateSpottingMutationVariables = Exact<{
    id: Scalars['String'];
    input: SpottingValidator;
}>;

export type CreateSpottingMutation = {
    __typename?: 'Mutation';
    createSpotting: {
        __typename?: 'Spotting';
        id: number;
        description?: string | null | undefined;
        visibility?: number | null | undefined;
        traffic?: number | null | undefined;
        createdAt: any;
        animal: {
            __typename?: 'Animal';
            id: number;
            name: string;
            disabled: boolean;
            color: { __typename?: 'Color'; light: string; dark: string };
        };
        location: { __typename?: 'Location'; lon: number; lat: number };
    };
};

export type AnimalsQueryVariables = Exact<{ [key: string]: never }>;

export type AnimalsQuery = {
    __typename?: 'Query';
    animals: Array<{
        __typename?: 'Animal';
        id: number;
        name: string;
        disabled: boolean;
        color: { __typename?: 'Color'; light: string; dark: string };
    }>;
};

export type CampsQueryVariables = Exact<{ [key: string]: never }>;

export type CampsQuery = {
    __typename?: 'Query';
    camps: Array<{
        __typename?: 'Camp';
        id: number;
        name: string;
        size: CampSize;
        location: { __typename?: 'Location'; lon: number; lat: number };
    }>;
};

export type GatesQueryVariables = Exact<{ [key: string]: never }>;

export type GatesQuery = {
    __typename?: 'Query';
    gates: Array<{
        __typename?: 'Gate';
        id: number;
        name: string;
        location: { __typename?: 'Location'; lon: number; lat: number };
    }>;
};

export type SpottingQueryVariables = Exact<{
    id: Scalars['Int'];
}>;

export type SpottingQuery = {
    __typename?: 'Query';
    spotting: {
        __typename?: 'Spotting';
        id: number;
        description?: string | null | undefined;
        visibility?: number | null | undefined;
        traffic?: number | null | undefined;
        animal: {
            __typename?: 'Animal';
            id: number;
            name: string;
            disabled: boolean;
            color: { __typename?: 'Color'; light: string; dark: string };
        };
        location: { __typename?: 'Location'; lon: number; lat: number };
    };
};

export type SpottingsQueryVariables = Exact<{
    animals?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
    excludedAnimals?: InputMaybe<Array<Scalars['Int']> | Scalars['Int']>;
    date?: InputMaybe<QueryDate>;
    hours?: InputMaybe<Hours>;
}>;

export type SpottingsQuery = {
    __typename?: 'Query';
    spottings: Array<{
        __typename?: 'Spotting';
        id: number;
        description?: string | null | undefined;
        visibility?: number | null | undefined;
        traffic?: number | null | undefined;
        createdAt: any;
        animal: {
            __typename?: 'Animal';
            id: number;
            name: string;
            disabled: boolean;
            color: { __typename?: 'Color'; light: string; dark: string };
        };
        location: { __typename?: 'Location'; lon: number; lat: number };
    }>;
};

export const CampFragmentDoc = gql`
    fragment Camp on Camp {
        id
        name
        location {
            lon
            lat
        }
        size
    }
`;
export const GateFragmentDoc = gql`
    fragment Gate on Gate {
        id
        name
        location {
            lon
            lat
        }
    }
`;
export const AnimalFragmentDoc = gql`
    fragment Animal on Animal {
        id
        name
        color {
            light
            dark
        }
        disabled
    }
`;
export const SpottingFragmentDoc = gql`
    fragment Spotting on Spotting {
        id
        animal {
            ...Animal
        }
        location {
            lon
            lat
        }
        description
        visibility
        traffic
        createdAt
    }
    ${AnimalFragmentDoc}
`;
export const SpottingExtendedFragmentDoc = gql`
    fragment SpottingExtended on Spotting {
        id
        animal {
            ...Animal
        }
        location {
            lon
            lat
        }
        description
        visibility
        traffic
    }
    ${AnimalFragmentDoc}
`;
export const CreateSpottingDocument = gql`
    mutation CreateSpotting($id: String!, $input: SpottingValidator!) {
        createSpotting(id: $id, input: $input) {
            ...Spotting
        }
    }
    ${SpottingFragmentDoc}
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
 *      id: // value for 'id'
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
    query Spotting($id: Int!) {
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
    query Spottings($animals: [Int!], $excludedAnimals: [Int!], $date: QueryDate, $hours: Hours) {
        spottings(animals: $animals, excludedAnimals: $excludedAnimals, date: $date, hours: $hours) {
            ...Spotting
        }
    }
    ${SpottingFragmentDoc}
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
 *      animals: // value for 'animals'
 *      excludedAnimals: // value for 'excludedAnimals'
 *      date: // value for 'date'
 *      hours: // value for 'hours'
 *   },
 * });
 */
export function useSpottingsQuery(baseOptions?: Apollo.QueryHookOptions<SpottingsQuery, SpottingsQueryVariables>) {
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
        Spotting: 'Spotting',
        SpottingExtended: 'SpottingExtended'
    }
};