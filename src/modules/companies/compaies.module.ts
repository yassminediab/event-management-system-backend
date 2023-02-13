import { Module } from '@nestjs/common';
import { CompanyController } from './companies.controller';
import { CompanyService } from './companies.service';
import { companyProviders } from './company.providers';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CompanyController],
  providers: [CompanyService, ...companyProviders],
})
export class companiesModule {}
