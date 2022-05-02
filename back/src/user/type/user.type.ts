import { User } from '../user.model';

export type UserPayload = Omit<User, 'password'>;
