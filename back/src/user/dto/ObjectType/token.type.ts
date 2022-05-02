import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenType {
    @Field()
    access_token: string;
}
