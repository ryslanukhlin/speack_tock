import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Subscription, Query } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { CurrentUser } from 'src/decorator/currentUser.decorator';
import { ChatService } from './chat.service';
import { Message } from './model/message.model';
import { Room } from './model/room.model';

const pubSub = new PubSub();

@Resolver()
export class ChatResolver {
    constructor(private readonly chatService: ChatService) {}

    @Query(() => [Message])
    @UseGuards(JwtAuthGuard)
    async getMessages(@Args('roomId') roomId: string) {
        return await this.chatService.getMessages(roomId);
    }

    @Mutation(() => Message)
    @UseGuards(JwtAuthGuard)
    async sendMessage(
        @Args('text') text: string,
        @Args('roomCode') roomCode: string,
        @CurrentUser() currentUser,
    ) {
        const message = await this.chatService.createMessage(currentUser.id, text, roomCode);
        pubSub.publish('sendMessageWatcher' + roomCode, {
            sendMessageWatcher: message,
        });
        return message;
    }

    @Subscription(() => Message)
    sendMessageWatcher(@Args('roomCode') roomCode: string) {
        return pubSub.asyncIterator('sendMessageWatcher' + roomCode);
    }
}
