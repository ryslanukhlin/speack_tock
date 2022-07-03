import {
    ApolloClient,
    ApolloLink,
    ApolloProvider,
    HttpLink,
    InMemoryCache,
    split,
} from '@apollo/client';
import { PropsWithChildren } from 'react';
import { tokenVar } from './store/token';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql' });
const wsLink =
    typeof window !== 'undefined'
        ? new GraphQLWsLink(
              createClient({
                  url: 'ws://localhost:8000/graphql',
              }),
          )
        : null;

const splitLink =
    typeof window !== 'undefined' && wsLink !== null
        ? split(
              ({ query }) => {
                  const definition = getMainDefinition(query);
                  return (
                      definition.kind === 'OperationDefinition' &&
                      definition.operation === 'subscription'
                  );
              },
              wsLink,
              httpLink,
          )
        : httpLink;

const authLink = new ApolloLink((operation, forward) => {
    const token = typeof localStorage !== "undefined" ? localStorage.getItem('auth_token') || tokenVar(): tokenVar();

    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    });

    return forward(operation);
});

const ClientApolloProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const client = new ApolloClient({
        link: authLink.concat(splitLink),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientApolloProvider;
