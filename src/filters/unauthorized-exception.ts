import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(UnauthorizedException)
export class NotAuthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errors = exception.getResponse() as any;
    const status = exception.getStatus();

    response.status(status).json({
      message: Array.isArray(errors.message)
        ? errors.message[0]
        : errors.message,
      data: {},
    });
  }
}
