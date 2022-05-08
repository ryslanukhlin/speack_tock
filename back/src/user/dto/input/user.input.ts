import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, IsEmail } from 'class-validator';
import { UniqueField } from 'src/decorator/uniqueField.decorator';

@InputType()
export class UserInput {
    @Field()
    @UniqueField()
    @IsNotEmpty()
    @IsString()
    @Length(12, 12)
    phone: string;

    @Field()
    @IsNotEmpty()
    @UniqueField()
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    @Length(4)
    password: string;
}
