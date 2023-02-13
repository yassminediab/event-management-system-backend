import { ExceptionFilter, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
export declare class BadRequestExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost): void;
}
