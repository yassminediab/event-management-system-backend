import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import appConfig from './config/configuration';
import dbConfiguration from './database/database.config';
import { companiesModule } from './modules/companies/compaies.module';
import { UsersModule } from './modules/users/users.module';
import { EventsModule } from './modules/events/events.module';
import { FeedbackModule } from './modules/feedback/feedback.module';
import {EventEmitterModule} from "@nestjs/event-emitter";
import {SocketModule} from "./modules/sockets/socket.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [() => appConfig, dbConfiguration],
      isGlobal: true,
    }),
    AuthModule,
    companiesModule,
    UsersModule,
    EventsModule,
    FeedbackModule,
    EventEmitterModule.forRoot(),
      SocketModule

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
