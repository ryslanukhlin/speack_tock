import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
            sortSchema: true,
            subscriptions: {
                'graphql-ws': true,
                'subscriptions-transport-ws': true,
            },
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DATA_HOST'),
                port: +configService.get<string>('DATA_PORT'),
                username: configService.get<string>('DATA_USER'),
                password: configService.get<string>('DATA_PASSWORD'),
                database: configService.get<string>('DATA_DB'),
                autoLoadEntities: true,
                synchronize: true,
            }),
        }),
        UserModule,
        AuthModule,
    ],
})
export class AppModule {}
