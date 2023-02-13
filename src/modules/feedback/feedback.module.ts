import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../database/database.module';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { feedbackProviders } from './feedback.providers';
import { EventsService } from '../events/events.service';
import { eventProviders } from '../events/event.providers';
import { CompanyService } from '../companies/companies.service';
import { companyProviders } from '../companies/company.providers';
import { UserService } from '../users/user.service';
import { userProviders } from '../users/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [FeedbackController],
  providers: [
    FeedbackService,
    ...feedbackProviders,
    EventsService,
    ...eventProviders,
    CompanyService,
    ...companyProviders,
    UserService,
    ...userProviders,
  ],
})
export class FeedbackModule {}
