import { makeVar } from '@apollo/client';

type User = {
    __typename?: 'User' | undefined;
    id: string;
    phone: string;
    name: string;
    email: string;
    outgoingRequestFrendship: Pick<User, 'id'>[];
    incomingRequestFrendship: Pick<User, 'id'>[];
    frends: Pick<User, 'id'>[];
};

export const userVar = makeVar<User | undefined>(undefined);
