import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformGetAllCompaniesResponseInterceptor<T>
  implements NestInterceptor<T>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: any) => {
        return {
          message: response.message,
          data: response.data.map((company) => {
            return {
              id: company.id,
              title: company.title,
              numberOfFollowers: company.numberOfFollowers,
              isFollowed: !!company.followers?.find((user) => response.userId == user?.id),
              user: {
                id: company?.user?.id,
                name: company?.user?.name,
                email: company?.user?.email,
              },
            };
          }),
        };
      }),
    );
  }
}
