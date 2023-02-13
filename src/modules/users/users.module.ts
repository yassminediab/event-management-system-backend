import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '../../database/database.module';
import { userProviders } from './user.providers';
import { CompanyService } from '../companies/companies.service';
import { companyProviders } from '../companies/company.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    ...userProviders,
    CompanyService,
    ...companyProviders,
  ],
})
export class UsersModule {}
