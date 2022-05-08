import { makeVar } from '@apollo/client';

type User = {
    __typename?: 'User' | undefined;
    phone: string;
    name: string;
    email: string;
};

export const userVar = makeVar<User | undefined>(undefined);
