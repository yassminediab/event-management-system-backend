import { Connection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../constants/constants';
import EventsEntity from './entities/events.entity';

export const eventProviders: Provider[] = [
  {
    provide: 'EVENT_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(EventsEntity),
    inject: [DATABASE_CONNECTION],
  },
];
