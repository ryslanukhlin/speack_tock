import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ChatModule } from 'src/chat/chat.module';
import { UniqueFieldValidator } from 'src/validator/uniqueField';
import { User } from './user.model';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        forwardRef(() => AuthModule),
        forwardRef(() => ChatModule),
    ],
    providers: [UserService, UserResolver, UniqueFieldValidator],
    exports: [UserService],
})
export class UserModule {}
