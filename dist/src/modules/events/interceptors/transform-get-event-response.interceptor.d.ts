import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class TransformGetEventResponseInterceptor<T> implements NestInterceptor<T> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
