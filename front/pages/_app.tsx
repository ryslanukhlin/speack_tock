import { AppProps } from 'next/app';
import AuthProvider from '../components/provider/AuthProvider';
import ClientApolloProvider from '../graphql/apollo';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <ClientApolloProvider>
            <AuthProvider publicPage={pageProps.public}>
                <Component {...pageProps} />
            </AuthProvider>
        </ClientApolloProvider>
    );
};

export default MyApp;
