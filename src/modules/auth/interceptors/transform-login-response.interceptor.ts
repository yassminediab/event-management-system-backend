import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformLoginResponseInterceptor<T>
  implements NestInterceptor<T>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: any) => {
        return {
          message: response.message,
          data: {
            id: response.data.user.id,
            name: response.data.user.name,
            email: response.data.user.email,
            token: response.data.token,
            company: response.data.user.company
          },
        };
      }),
    );
  }
}
