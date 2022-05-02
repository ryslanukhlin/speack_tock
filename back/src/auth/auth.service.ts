import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/user/type/user.type';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) {}

    async validateUser(phone: string, password: string) {
        const user = await this.userService.findOne(phone);
        if (user && compareSync(password, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(userPayload: UserPayload) {
        const user = await this.userService.findOne(userPayload.phone);
        const payload = { phone: user.phone, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
