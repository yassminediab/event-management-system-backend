import { ExceptionFilter, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
export declare class NotAuthorizedExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost): void;
}
