import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { type Request } from 'express';
export const CurrentUser = createParamDecorator(
  (data: never, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    return req['user'];
  },
);
