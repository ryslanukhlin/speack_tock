import { useReactiveVar } from '@apollo/client';
import React, { FC, ReactNode } from 'react';
import { userVar } from '../../graphql/store/user';
import UserLayout from './UserLayout';

type UserLayoutProps = {
    children: ReactNode;
};

const AuthLayout: FC<UserLayoutProps> = ({ children }) => {
    const user = useReactiveVar(userVar);

    if (user) return <UserLayout>{children}</UserLayout>;

    return <>{children}</>;
};

export default AuthLayout;
