import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import type { Response, Request } from 'express';
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res: Response = ctx.getResponse();
    const req: Request = ctx.getRequest();
    const response =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';
    const status: number =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const stack = (exception as Error).stack ?? null;
    res.status(status).json({
      ...(typeof response === 'object' ? response : { message: response }),
      path: req.url,
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === 'development' && { stack }),
    });
  }
}
