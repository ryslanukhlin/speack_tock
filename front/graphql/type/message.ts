export type Message = {
    __typename?: 'Message' | undefined;
    id: string;
    text: string;
    dateCreated: number;
    user: {
        __typename?: 'User' | undefined;
        id: string;
    };
};
