import { useReactiveVar } from '@apollo/client';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useGetUserLazyQuery } from '../../graphql/generated';
import { tokenVar } from '../../graphql/store/token';
import { downloadUserVar } from '../../graphql/store/downloadUser';
import Spinner from '../Spinner';
import { userVar } from '../../graphql/store/user';

type AuthProviderProps = {
    children: ReactNode;
    protectedPage: boolean;
};

type User = {
    phone: string;
    name: string;
    email: string;
};

const AuthProvider: FC<AuthProviderProps> = ({ children, protectedPage }) => {
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
                flushSync(() => {
                    userVar(data.getUser);
                });
            }
            downloadUserVar(false);
        }, 0);
    }, [token]);

    if (protectedPage && !user && downloadUserVar()) {
        return <Spinner color="indigo" />;
    }

    if (protectedPage && !user && !downloadUserVar()) {
        router.push('/login');
        return null;
    }

    if (!protectedPage && user) {
        router.push('/');
        return null;
    }

    return <>{children}</>;
};

export default AuthProvider;
