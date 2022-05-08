import { GraphQLErrorExtensions } from 'graphql';

export interface ValidError extends GraphQLErrorExtensions {
    code: string;
    response: Response;
}

interface Response {
    statusCode: number;
    message: string[];
    error: string;
}
