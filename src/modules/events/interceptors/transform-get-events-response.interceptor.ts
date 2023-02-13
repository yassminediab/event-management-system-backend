import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformGetEventsResponseInterceptor<T>
  implements NestInterceptor<T>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((response: any) => {
        return {
          message: response.message,
          data: response.data.map((event) => {
            return {
              id: event.id,
              title: event.title,
              location: event.location,
              description: event.description,
              numberOfRsvp: event.numberOfRsvp,
              actualDate: event.date,
              isRsvp: !!event.rsvp?.find((user) => response.userId == user?.id),
              date: new Date(event.date).toLocaleString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
              }),
              company: {
                id: event?.company?.id,
                title: event?.company?.title,
              },
            };
          }),
        };
      }),
    );
  }
}
