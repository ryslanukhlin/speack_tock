import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { Message } from './message.model';

@Entity()
@ObjectType()
export class Room {
    @Field(() => ID)
    @PrimaryColumn()
    id: string;

    @Field(() => [User])
    @ManyToMany(() => User, (user) => user.rooms)
    @JoinTable()
    users: User[];

    @Field(() => [Message], { defaultValue: [] })
    @ManyToMany(() => Message)
    @JoinTable()
    messages: Message[];
}
