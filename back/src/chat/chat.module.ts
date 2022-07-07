import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { ChatResolver } from './chat.resolver';
import { ChatService } from './chat.service';
import { Message } from './model/message.model';
import { Room } from './model/room.model';

@Module({
    imports: [TypeOrmModule.forFeature([Room, Message]), forwardRef(() => UserModule)],
    providers: [ChatService, ChatResolver],
    exports: [ChatService],
})
export class ChatModule {}
