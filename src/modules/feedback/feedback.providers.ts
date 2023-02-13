import { Connection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../constants/constants';
import { Feedback } from './entities/feedback.entity';

export const feedbackProviders: Provider[] = [
  {
    provide: 'FEEDBACK_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Feedback),
    inject: [DATABASE_CONNECTION],
  },
];
