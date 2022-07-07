import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { UserInput } from './dto/input/user.input';
import { User } from './user.model';
import { hashSync } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly chatService: ChatService,
    ) {}

    async findByName(id: string) {
        return this.usersRepository.find({
            where: { id: Not(id) },
        });
    }

    createdUser(userInput: UserInput) {
        const bcryptPassword = hashSync(userInput.password, 7);
        userInput.password = bcryptPassword;
        return this.usersRepository.save({ id: uuidv4(), ...userInput });
    }

    findOne(phone: string) {
        return this.usersRepository.findOneBy({ phone });
    }

    findOneField(value: string, property: keyof User) {
        return this.usersRepository.findOne({
            where: { [property]: value },
            relations: [
                'incomingRequestFrendship',
                'outgoingRequestFrendship',
                'frends',
                'rooms.users',
            ],
        });
    }

    async createRequestFrendship(id: string, frendId: string): Promise<[me: User, frend: User]> {
        const me = await this.usersRepository.findOne({
            where: { id },
            relations: [
                'incomingRequestFrendship',
                'outgoingRequestFrendship',
                'frends',
                'rooms.users',
            ],
        });
        const frend = await this.usersRepository.findOne({
            where: { id: frendId },
            relations: [
                'incomingRequestFrendship',
                'outgoingRequestFrendship',
                'frends',
                'rooms.users',
            ],
        });

        me.outgoingRequestFrendship =
            me.outgoingRequestFrendship.length !== 0
                ? [...me.outgoingRequestFrendship, frend]
                : [frend];

        frend.incomingRequestFrendship =
            frend.incomingRequestFrendship.length !== 0
                ? [...frend.incomingRequestFrendship, me]
                : [me];

        await this.usersRepository.save(me);
        await this.usersRepository.save(frend);

        return [me, frend];
    }

    async addFrend(id: string, frendId: string): Promise<[me: User, frend: User]> {
        const me = await this.usersRepository.findOne({
            where: { id },
            relations: [
                'incomingRequestFrendship',
                'outgoingRequestFrendship',
                'frends',
                'rooms.users',
            ],
        });
        const frend = await this.usersRepository.findOne({
            where: { id: frendId },
            relations: [
                'incomingRequestFrendship',
                'outgoingRequestFrendship',
                'frends',
                'rooms.users',
            ],
        });

        me.frends = me.frends.length !== 0 ? [...me.frends, frend] : [frend];
        frend.frends = frend.frends.length !== 0 ? [...frend.frends, me] : [me];

        await this.usersRepository.save(me);
        await this.usersRepository.save(frend);

        const room = await this.chatService.createRoom(me, frend);
        frend.rooms.push(room);
        me.rooms.push(room);

        return [me, frend];
    }
}
