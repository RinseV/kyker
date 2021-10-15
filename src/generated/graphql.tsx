import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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
    createdAt: Scalars['Timestamp'];
    id: Scalars['Int'];
    name: Scalars['String'];
    updatedAt: Scalars['Timestamp'];
};

export type Location = {
    __typename?: 'Location';
    lat: Scalars['Float'];
    lon: Scalars['Float'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createSpotting: Spotting;
    login: User;
};

export type MutationCreateSpottingArgs = {
    id: Scalars['String'];
    input: SpottingValidator;
};

export type MutationLoginArgs = {
    fingerprint: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    animals: Array<Animal>;
    spottings: Array<Spotting>;
};

export type QuerySpottingsArgs = {
    animals?: Maybe<Array<Scalars['Int']>>;
};

export type Spotting = {
    __typename?: 'Spotting';
    animal: Animal;
    createdAt: Scalars['Timestamp'];
    description: Scalars['String'];
    id: Scalars['Int'];
    imageId: Scalars['String'];
    location: Location;
    updatedAt: Scalars['Timestamp'];
    user: User;
};

export type SpottingValidator = {
    animal: Scalars['Int'];
    description?: Maybe<Scalars['String']>;
    lat: Scalars['Float'];
    lon: Scalars['Float'];
};

export type User = {
    __typename?: 'User';
    createdAt: Scalars['Timestamp'];
    id: Scalars['ID'];
    spottings: Array<Spotting>;
    updatedAt: Scalars['Timestamp'];
};

export type AnimalFragment = { __typename?: 'Animal'; id: number; name: string };

export type SpottingFragment = {
    __typename?: 'Spotting';
    id: number;
    description: string;
    animal: { __typename?: 'Animal'; id: number; name: string };
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
        description: string;
        animal: { __typename?: 'Animal'; id: number; name: string };
        location: { __typename?: 'Location'; lon: number; lat: number };
    };
};

export type AnimalsQueryVariables = Exact<{ [key: string]: never }>;

export type AnimalsQuery = {
    __typename?: 'Query';
    animals: Array<{ __typename?: 'Animal'; id: number; name: string }>;
};

export type SpottingsQueryVariables = Exact<{
    animals?: Maybe<Array<Scalars['Int']> | Scalars['Int']>;
}>;

export type SpottingsQuery = {
    __typename?: 'Query';
    spottings: Array<{
        __typename?: 'Spotting';
        id: number;
        description: string;
        animal: { __typename?: 'Animal'; id: number; name: string };
        location: { __typename?: 'Location'; lon: number; lat: number };
    }>;
};

export const AnimalFragmentDoc = gql`
    fragment Animal on Animal {
        id
        name
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
export const SpottingsDocument = gql`
    query Spottings($animals: [Int!]) {
        spottings(animals: $animals) {
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
        Spottings: 'Spottings'
    },
    Mutation: {
        CreateSpotting: 'CreateSpotting'
    },
    Fragment: {
        Animal: 'Animal',
        Spotting: 'Spotting'
    }
};
