import { Connection } from 'typeorm';
import { Provider } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../../constants/constants';
import Company from './entities/companies.entity';

export const companyProviders: Provider[] = [
  {
    provide: 'COMPANY_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Company),
    inject: [DATABASE_CONNECTION],
  },
];
