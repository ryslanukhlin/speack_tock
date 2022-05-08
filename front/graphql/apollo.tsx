import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { PropsWithChildren } from 'react';
import { tokenVar } from './store/token';

const httpLink = new HttpLink({ uri: 'http://localhost:8000/graphql' });

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('auth_token') || tokenVar();

    operation.setContext({
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
    });

    return forward(operation);
});

const ClientApolloProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
    const client = new ApolloClient({
        link: authLink.concat(httpLink),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ClientApolloProvider;
