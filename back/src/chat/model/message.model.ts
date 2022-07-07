import { Field, ID, ObjectType, Int } from '@nestjs/graphql';
import { User } from 'src/user/user.model';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Message {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    text: string;

    @Field(() => String)
    @Column({ type: 'bigint' })
    dateCreated: number;

    @Field(() => User)
    @ManyToOne(() => User)
    @JoinColumn()
    user: User;
}
