import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserPayload } from 'src/user/type/user.type';

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): UserPayload => {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext();
        request.body = ctx.getArgs();
        return request.user;
    },
);
