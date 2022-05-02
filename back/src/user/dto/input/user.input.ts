import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, Length, Min } from 'class-validator';
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
    @IsString()
    @Length(4)
    password: string;
}
