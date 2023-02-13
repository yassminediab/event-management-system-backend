import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformUsersResponseInterceptor<T>
  implements NestInterceptor<T>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: any) => {
        return {
          message: response.message,
          data: response.data.map((user) => {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
            };
          }),
        };
      }),
    );
  }
}
