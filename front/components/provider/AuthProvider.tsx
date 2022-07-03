import { useReactiveVar, useSubscription } from '@apollo/client';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import { useGetUserLazyQuery } from '../../graphql/generated';
import { tokenVar } from '../../graphql/store/token';
import { downloadUserVar } from '../../graphql/store/downloadUser';
import Spinner from '../Spinner';
import { userVar } from '../../graphql/store/user';
import AuthLayout from '../layout/AuthLayout';

type AuthProviderProps = {
    children: ReactNode;
    publicPage: boolean;
};

type User = {
    phone: string;
    name: string;
    email: string;
};

const AuthProvider: FC<AuthProviderProps> = ({ children, publicPage }) => {
    const router = useRouter();
    const user = useReactiveVar(userVar);
    const token = useReactiveVar(tokenVar);
    const [loadingUser] = useGetUserLazyQuery({
        errorPolicy: 'all',
    });

    useEffect(() => {
        setTimeout(async () => {
            downloadUserVar(true);
            const { data } = await loadingUser();

            if (data) {
                userVar(data.getUser);
            }
            downloadUserVar(false);
        }, 0);
    }, [token]);

    if (!publicPage && !user && downloadUserVar()) {
        return <Spinner color="indigo" />;
    }

    if (!publicPage && !user && !downloadUserVar()) {
        router.push('/login');
        return null;
    }

    if (!!publicPage && user) {
        router.push('/' + user.id);
        return null;
    }

    return <AuthLayout>{children}</AuthLayout>;
};

export default AuthProvider;
