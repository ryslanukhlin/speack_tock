import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
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
    frends: User[]
}
