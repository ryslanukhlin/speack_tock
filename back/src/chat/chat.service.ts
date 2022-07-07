import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './model/room.model';
import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/user/user.model';
import { Message } from './model/message.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Room)
        private readonly roomRepository: Repository<Room>,
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) {}

    async getMessages(roomId: string) {
        const room = await this.roomRepository.findOne({
            where: { id: roomId },
            relations: ['messages.user'],
        });

        return room.messages;
    }

    async createRoom(user: User, frend: User) {
        const room = this.roomRepository.create({ id: uuidv4() });
        room.users = [user, frend];
        return await this.roomRepository.save(room);
    }

    async createMessage(id: string, text: string, roomId: string) {
        const user = await this.userService.findOneField(id, 'id');

        const message = this.messageRepository.create({
            text,
            dateCreated: new Date().getTime(),
        });
        message.user = user;

        const saveMessage = await this.messageRepository.save(message);

        const room = await this.roomRepository.findOne({
            where: { id: roomId },
            relations: ['messages'],
        });
        room.messages =
            room.messages.length !== 0 ? [...room.messages, saveMessage] : [saveMessage];
        await this.roomRepository.save(room);

        return saveMessage;
    }
}
