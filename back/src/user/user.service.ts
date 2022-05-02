import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInput } from './dto/input/user.input';
import { User } from './user.model';
import { hashSync } from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) {}

    createdUser(userInput: UserInput) {
        const bcryptPassword = hashSync(userInput.password, 7);
        userInput.password = bcryptPassword;
        return this.usersRepository.save(userInput);
    }

    findOne(phone: string) {
        return this.usersRepository.findOneBy({ phone });
    }

    findOneField(value: string, property: keyof User) {
        return this.usersRepository.findOneBy({ [property]: value });
    }
}
