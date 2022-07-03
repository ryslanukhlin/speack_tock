import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { GqlAuthGuard } from 'src/auth/guard/local-auth.guard';
import { TokenType } from './dto/ObjectType/token.type';
import { UserInput } from './dto/input/user.input';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserPayload } from './type/user.type';
import { AuthInput } from './dto/input/auth.input';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Query(() => User)
    @UseGuards(JwtAuthGuard)
    async getUser(@CurrentUser() userPayload: UserPayload) {
        return await this.userService.findOneField(userPayload.id, 'id');
    }

    @Query(() => [User])
    @UseGuards(JwtAuthGuard)
    async getUsers(@Args('id') id: string) {
        return await this.userService.findByName(id);
    }

    @Mutation(() => TokenType)
    @UseGuards(GqlAuthGuard)
    async loginUser(
        @Args('authInput') authInput: AuthInput,
        @CurrentUser() userPayload: UserPayload,
    ) {
        return await this.authService.login(userPayload);
    }

    @Mutation(() => User)
    async registerUser(@Args('userInput') userInput: UserInput) {
        return await this.userService.createdUser(userInput);
    }

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard)
    async requestFrendship(@Args('id') id: string, @Args('frendId') frendiId: string) {
        const [me, frend] = await this.userService.createRequestFrendship(id, frendiId);

        pubSub.publish('incomingRequestFrendship' + frendiId, {
            incomingRequestFrendship: frend,
        });
        return me;
    }

    @Mutation(() => User)
    @UseGuards(JwtAuthGuard)
    async addFrend(@Args('id') id: string, @Args('frendId') frendId: string) {
        const [me, frend] = await this.userService.addFrend(id, frendId);

        pubSub.publish('addFrendSubscribe' + frendId, {
            addFrendSubscribe: frend,
        });

        return me;
    }

    @Subscription(() => User)
    incomingRequestFrendship(@Args('roomCode') roomCode: string) {
        return pubSub.asyncIterator('incomingRequestFrendship' + roomCode);
    }

    @Subscription(() => User)
    addFrendSubscribe(@Args('roomCode') roomCode: string) {
        return pubSub.asyncIterator('addFrendSubscribe' + roomCode);
    }
}
