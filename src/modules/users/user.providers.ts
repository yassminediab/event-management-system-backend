import { Connection } from 'typeorm';
import { Provider } from '@nestjs/common';
import User from './entities/users.entity';
import { DATABASE_CONNECTION } from '../../constants/constants';

export const userProviders: Provider[] = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(User),
    inject: [DATABASE_CONNECTION],
  },
];
