import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
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

@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}

    @Query(() => String)
    @UseGuards(JwtAuthGuard)
    hellow() {
        return 'hellow';
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
}
