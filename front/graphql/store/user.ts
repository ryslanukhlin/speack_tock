import { makeVar } from '@apollo/client';

export type Room = {
    id: string;
    users: Pick<User, 'id' | 'name' | 'phone'>[];
};

type User = {
    __typename?: 'User' | undefined;
    id: string;
    phone: string;
    name: string;
    email: string;
    outgoingRequestFrendship: Pick<User, 'id'>[];
    incomingRequestFrendship: Pick<User, 'id'>[];
    frends: Pick<User, 'id' | 'name' | 'phone' | 'email'>[];
    rooms: Room[];
};

export const userVar = makeVar<User | undefined>(undefined);
