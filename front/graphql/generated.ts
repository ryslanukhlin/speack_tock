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
};

export type AuthInput = {
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  dateCreated: Scalars['Int'];
  id: Scalars['ID'];
  text: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFrend: User;
  loginUser: TokenType;
  registerUser: User;
  requestFrendship: User;
  sendMessage: Message;
};


export type MutationAddFrendArgs = {
  frendId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationLoginUserArgs = {
  authInput: AuthInput;
};


export type MutationRegisterUserArgs = {
  userInput: UserInput;
};


export type MutationRequestFrendshipArgs = {
  frendId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationSendMessageArgs = {
  roomCode: Scalars['String'];
  text: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getMessages: Array<Message>;
  getUser: User;
  getUsers: Array<User>;
};


export type QueryGetMessagesArgs = {
  roomId: Scalars['String'];
};


export type QueryGetUsersArgs = {
  id: Scalars['String'];
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['ID'];
  messages: Array<Message>;
  users: Array<User>;
};

export type Subscription = {
  __typename?: 'Subscription';
  addFrendSubscribe: User;
  incomingRequestFrendship: User;
  sendMessageWatcher: Message;
};


export type SubscriptionAddFrendSubscribeArgs = {
  roomCode: Scalars['String'];
};


export type SubscriptionIncomingRequestFrendshipArgs = {
  roomCode: Scalars['String'];
};


export type SubscriptionSendMessageWatcherArgs = {
  roomCode: Scalars['String'];
};

export type TokenType = {
  __typename?: 'TokenType';
  access_token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  frends: Array<User>;
  id: Scalars['ID'];
  incomingRequestFrendship: Array<User>;
  name: Scalars['String'];
  outgoingRequestFrendship: Array<User>;
  password: Scalars['String'];
  phone: Scalars['String'];
  rooms: Array<Room>;
};

export type UserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type UserFragmentFragment = { __typename?: 'User', id: string, phone: string, name: string, email: string, outgoingRequestFrendship: Array<{ __typename?: 'User', id: string }>, incomingRequestFrendship: Array<{ __typename?: 'User', id: string }>, frends: Array<{ __typename?: 'User', id: string, name: string, email: string, phone: string }>, rooms: Array<{ __typename?: 'Room', id: string, users: Array<{ __typename?: 'User', id: string, name: string, phone: string }> }> };

export type AddFrendMutationVariables = Exact<{
  id: Scalars['String'];
  frendId: Scalars['String'];
}>;


export type AddFrendMutation = { __typename?: 'Mutation', addFrend: { __typename?: 'User', id: string, phone: string, name: string, email: string, outgoingRequestFrendship: Array<{ __typename?: 'User', id: string }>, incomingRequestFrendship: Array<{ __typename?: 'User', id: string }>, frends: Array<{ __typename?: 'User', id: string, name: string, email: string, phone: string }>, rooms: Array<{ __typename?: 'Room', id: string, users: Array<{ __typename?: 'User', id: string, name: string, phone: string }> }> } };

export type LoginUserMutationVariables = Exact<{
  phone: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'TokenType', access_token: string } };

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
}>;


export type RegisterUserMutation = { __typename?: 'Mutation', registerUser: { __typename?: 'User', name: string } };

export type RequestFrendshipMutationVariables = Exact<{
  id: Scalars['String'];
  frendId: Scalars['String'];
}>;


export type RequestFrendshipMutation = { __typename?: 'Mutation', requestFrendship: { __typename?: 'User', id: string, phone: string, name: string, email: string, outgoingRequestFrendship: Array<{ __typename?: 'User', id: string }>, incomingRequestFrendship: Array<{ __typename?: 'User', id: string }>, frends: Array<{ __typename?: 'User', id: string, name: string, email: string, phone: string }>, rooms: Array<{ __typename?: 'Room', id: string, users: Array<{ __typename?: 'User', id: string, name: string, phone: string }> }> } };

export type SendMessageMutationVariables = Exact<{
  text: Scalars['String'];
  roomCode: Scalars['String'];
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: string } };

export type GetMessagesQueryVariables = Exact<{
  roomId: Scalars['String'];
}>;


export type GetMessagesQuery = { __typename?: 'Query', getMessages: Array<{ __typename?: 'Message', id: string, text: string, dateCreated: number, user: { __typename?: 'User', id: string } }> };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, phone: string, name: string, email: string, outgoingRequestFrendship: Array<{ __typename?: 'User', id: string }>, incomingRequestFrendship: Array<{ __typename?: 'User', id: string }>, frends: Array<{ __typename?: 'User', id: string, name: string, email: string, phone: string }>, rooms: Array<{ __typename?: 'Room', id: string, users: Array<{ __typename?: 'User', id: string, name: string, phone: string }> }> } };

export type GetUsersQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: Array<{ __typename?: 'User', id: string, name: string }> };

export type UsersNamesFragment = { __typename?: 'User', id: string, name: string };

export type AddFrendSubscribeSubscriptionVariables = Exact<{
  roomCode: Scalars['String'];
}>;


export type AddFrendSubscribeSubscription = { __typename?: 'Subscription', addFrendSubscribe: { __typename?: 'User', id: string, phone: string, name: string, email: string, outgoingRequestFrendship: Array<{ __typename?: 'User', id: string }>, incomingRequestFrendship: Array<{ __typename?: 'User', id: string }>, frends: Array<{ __typename?: 'User', id: string, name: string, email: string, phone: string }>, rooms: Array<{ __typename?: 'Room', id: string, users: Array<{ __typename?: 'User', id: string, name: string, phone: string }> }> } };

export type IncomingRequestFrendshipSubscriptionVariables = Exact<{
  roomCode: Scalars['String'];
}>;


export type IncomingRequestFrendshipSubscription = { __typename?: 'Subscription', incomingRequestFrendship: { __typename?: 'User', id: string, phone: string, name: string, email: string, outgoingRequestFrendship: Array<{ __typename?: 'User', id: string }>, incomingRequestFrendship: Array<{ __typename?: 'User', id: string }>, frends: Array<{ __typename?: 'User', id: string, name: string, email: string, phone: string }>, rooms: Array<{ __typename?: 'Room', id: string, users: Array<{ __typename?: 'User', id: string, name: string, phone: string }> }> } };

export type SendMessageWatcherSubscriptionVariables = Exact<{
  roomCode: Scalars['String'];
}>;


export type SendMessageWatcherSubscription = { __typename?: 'Subscription', sendMessageWatcher: { __typename?: 'Message', id: string, dateCreated: number, text: string, user: { __typename?: 'User', id: string } } };

export const UserFragmentFragmentDoc = gql`
    fragment UserFragment on User {
  id
  phone
  name
  email
  outgoingRequestFrendship {
    id
  }
  incomingRequestFrendship {
    id
  }
  frends {
    id
    name
    email
    phone
  }
  rooms {
    id
    users {
      id
      name
      phone
    }
  }
}
    `;
export const UsersNamesFragmentDoc = gql`
    fragment UsersNames on User {
  id
  name
}
    `;
export const AddFrendDocument = gql`
    mutation addFrend($id: String!, $frendId: String!) {
  addFrend(id: $id, frendId: $frendId) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type AddFrendMutationFn = Apollo.MutationFunction<AddFrendMutation, AddFrendMutationVariables>;

/**
 * __useAddFrendMutation__
 *
 * To run a mutation, you first call `useAddFrendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddFrendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addFrendMutation, { data, loading, error }] = useAddFrendMutation({
 *   variables: {
 *      id: // value for 'id'
 *      frendId: // value for 'frendId'
 *   },
 * });
 */
export function useAddFrendMutation(baseOptions?: Apollo.MutationHookOptions<AddFrendMutation, AddFrendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddFrendMutation, AddFrendMutationVariables>(AddFrendDocument, options);
      }
export type AddFrendMutationHookResult = ReturnType<typeof useAddFrendMutation>;
export type AddFrendMutationResult = Apollo.MutationResult<AddFrendMutation>;
export type AddFrendMutationOptions = Apollo.BaseMutationOptions<AddFrendMutation, AddFrendMutationVariables>;
export const LoginUserDocument = gql`
    mutation loginUser($phone: String!, $password: String!) {
  loginUser(authInput: {phone: $phone, password: $password}) {
    access_token
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      phone: // value for 'phone'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const RegisterUserDocument = gql`
    mutation registerUser($email: String!, $name: String!, $password: String!, $phone: String!) {
  registerUser(
    userInput: {name: $name, phone: $phone, email: $email, password: $password}
  ) {
    name
  }
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      password: // value for 'password'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;
export const RequestFrendshipDocument = gql`
    mutation requestFrendship($id: String!, $frendId: String!) {
  requestFrendship(id: $id, frendId: $frendId) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;
export type RequestFrendshipMutationFn = Apollo.MutationFunction<RequestFrendshipMutation, RequestFrendshipMutationVariables>;

/**
 * __useRequestFrendshipMutation__
 *
 * To run a mutation, you first call `useRequestFrendshipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestFrendshipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestFrendshipMutation, { data, loading, error }] = useRequestFrendshipMutation({
 *   variables: {
 *      id: // value for 'id'
 *      frendId: // value for 'frendId'
 *   },
 * });
 */
export function useRequestFrendshipMutation(baseOptions?: Apollo.MutationHookOptions<RequestFrendshipMutation, RequestFrendshipMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestFrendshipMutation, RequestFrendshipMutationVariables>(RequestFrendshipDocument, options);
      }
export type RequestFrendshipMutationHookResult = ReturnType<typeof useRequestFrendshipMutation>;
export type RequestFrendshipMutationResult = Apollo.MutationResult<RequestFrendshipMutation>;
export type RequestFrendshipMutationOptions = Apollo.BaseMutationOptions<RequestFrendshipMutation, RequestFrendshipMutationVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($text: String!, $roomCode: String!) {
  sendMessage(text: $text, roomCode: $roomCode) {
    id
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      roomCode: // value for 'roomCode'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const GetMessagesDocument = gql`
    query getMessages($roomId: String!) {
  getMessages(roomId: $roomId) {
    id
    text
    dateCreated
    user {
      id
    }
  }
}
    `;

/**
 * __useGetMessagesQuery__
 *
 * To run a query within a React component, call `useGetMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMessagesQuery({
 *   variables: {
 *      roomId: // value for 'roomId'
 *   },
 * });
 */
export function useGetMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
      }
export function useGetMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMessagesQuery, GetMessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMessagesQuery, GetMessagesQueryVariables>(GetMessagesDocument, options);
        }
export type GetMessagesQueryHookResult = ReturnType<typeof useGetMessagesQuery>;
export type GetMessagesLazyQueryHookResult = ReturnType<typeof useGetMessagesLazyQuery>;
export type GetMessagesQueryResult = Apollo.QueryResult<GetMessagesQuery, GetMessagesQueryVariables>;
export const GetUserDocument = gql`
    query getUser {
  getUser {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const GetUsersDocument = gql`
    query getUsers($id: String!) {
  getUsers(id: $id) {
    ...UsersNames
  }
}
    ${UsersNamesFragmentDoc}`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const AddFrendSubscribeDocument = gql`
    subscription addFrendSubscribe($roomCode: String!) {
  addFrendSubscribe(roomCode: $roomCode) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useAddFrendSubscribeSubscription__
 *
 * To run a query within a React component, call `useAddFrendSubscribeSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAddFrendSubscribeSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddFrendSubscribeSubscription({
 *   variables: {
 *      roomCode: // value for 'roomCode'
 *   },
 * });
 */
export function useAddFrendSubscribeSubscription(baseOptions: Apollo.SubscriptionHookOptions<AddFrendSubscribeSubscription, AddFrendSubscribeSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<AddFrendSubscribeSubscription, AddFrendSubscribeSubscriptionVariables>(AddFrendSubscribeDocument, options);
      }
export type AddFrendSubscribeSubscriptionHookResult = ReturnType<typeof useAddFrendSubscribeSubscription>;
export type AddFrendSubscribeSubscriptionResult = Apollo.SubscriptionResult<AddFrendSubscribeSubscription>;
export const IncomingRequestFrendshipDocument = gql`
    subscription incomingRequestFrendship($roomCode: String!) {
  incomingRequestFrendship(roomCode: $roomCode) {
    ...UserFragment
  }
}
    ${UserFragmentFragmentDoc}`;

/**
 * __useIncomingRequestFrendshipSubscription__
 *
 * To run a query within a React component, call `useIncomingRequestFrendshipSubscription` and pass it any options that fit your needs.
 * When your component renders, `useIncomingRequestFrendshipSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIncomingRequestFrendshipSubscription({
 *   variables: {
 *      roomCode: // value for 'roomCode'
 *   },
 * });
 */
export function useIncomingRequestFrendshipSubscription(baseOptions: Apollo.SubscriptionHookOptions<IncomingRequestFrendshipSubscription, IncomingRequestFrendshipSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<IncomingRequestFrendshipSubscription, IncomingRequestFrendshipSubscriptionVariables>(IncomingRequestFrendshipDocument, options);
      }
export type IncomingRequestFrendshipSubscriptionHookResult = ReturnType<typeof useIncomingRequestFrendshipSubscription>;
export type IncomingRequestFrendshipSubscriptionResult = Apollo.SubscriptionResult<IncomingRequestFrendshipSubscription>;
export const SendMessageWatcherDocument = gql`
    subscription sendMessageWatcher($roomCode: String!) {
  sendMessageWatcher(roomCode: $roomCode) {
    id
    dateCreated
    text
    user {
      id
    }
  }
}
    `;

/**
 * __useSendMessageWatcherSubscription__
 *
 * To run a query within a React component, call `useSendMessageWatcherSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSendMessageWatcherSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSendMessageWatcherSubscription({
 *   variables: {
 *      roomCode: // value for 'roomCode'
 *   },
 * });
 */
export function useSendMessageWatcherSubscription(baseOptions: Apollo.SubscriptionHookOptions<SendMessageWatcherSubscription, SendMessageWatcherSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SendMessageWatcherSubscription, SendMessageWatcherSubscriptionVariables>(SendMessageWatcherDocument, options);
      }
export type SendMessageWatcherSubscriptionHookResult = ReturnType<typeof useSendMessageWatcherSubscription>;
export type SendMessageWatcherSubscriptionResult = Apollo.SubscriptionResult<SendMessageWatcherSubscription>;