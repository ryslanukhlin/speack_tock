import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserPayload {
    @Field()
    name: string;

    @Field()
    phone: string;

    @Field()
    email: string;

    @Field()
    id: string;
}
