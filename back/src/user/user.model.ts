import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @Field(() => String)
    phone: string;

    @Column()
    @Field(() => String)
    password: string;
}
