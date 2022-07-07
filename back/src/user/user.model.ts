import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Room } from 'src/chat/model/room.model';
import {
    Column,
    Entity,
    Generated,
    JoinTable,
    ManyToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
    @Field(() => ID)
    @PrimaryColumn()
    id: string;

    @Column()
    @Field(() => String)
    name: string;

    @Column()
    @Field(() => String)
    email: string;

    @Column()
    @Field(() => String)
    phone: string;

    @Column()
    @Field(() => String)
    password: string;

    @Field(() => [User], { defaultValue: [] })
    @ManyToMany(() => User, (user) => user.outgoingRequestFrendship)
    incomingRequestFrendship: User[];

    @Field(() => [User], { defaultValue: [] })
    @ManyToMany(() => User, (user) => user.incomingRequestFrendship)
    @JoinTable()
    outgoingRequestFrendship: User[];

    @Field(() => [User], { defaultValue: [] })
    @ManyToMany(() => User, (user) => user.frends)
    @JoinTable()
    frends: User[];

    @Field(() => [Room], { defaultValue: [] })
    @ManyToMany(() => Room, (room) => room.users)
    rooms: Room[];
}
