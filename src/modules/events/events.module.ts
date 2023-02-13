import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { DatabaseModule } from '../../database/database.module';
import { eventProviders } from './event.providers';
import { CompanyService } from '../companies/companies.service';
import { companyProviders } from '../companies/company.providers';
import { UserService } from '../users/user.service';
import { userProviders } from '../users/user.providers';
import {SendEventEmailNotification} from "./listeners/send-event-email-notification.listeners";
import {MailtrapProvider} from "../../mail-providers/mailtrap.provider";
import {SendEventNotificationSocketsListeners} from "./listeners/send-event-notification-sockets.listeners";

@Module({
  imports: [DatabaseModule],
  controllers: [EventsController],
  providers: [
    EventsService,
    ...eventProviders,
    CompanyService,
    ...companyProviders,
    UserService,
    ...userProviders,
    SendEventEmailNotification,
      MailtrapProvider,
    SendEventNotificationSocketsListeners
  ],
})
export class EventsModule {}
