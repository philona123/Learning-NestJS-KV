import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { User } from "./user.entity";

export const GetUser = createParamDecorator((_data, ctx: ExecutionContext): User => {
    const context = GqlExecutionContext.create(ctx);
    const req = context.getContext().req;
    return req.user;
},);