import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformRegisterResponseInterceptor<T>
  implements NestInterceptor<T>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: any) => {
        return {
          message: response.message,
          data: {
            id: response.data.id,
            name: response.data.name,
            email: response.data.email,
            company: response.data.company
          },
        };
      }),
    );
  }
}
