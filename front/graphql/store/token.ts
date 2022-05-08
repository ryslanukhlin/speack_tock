import { makeVar } from '@apollo/client';

type token = string | undefined;

export const tokenVar = makeVar<token>(undefined);
