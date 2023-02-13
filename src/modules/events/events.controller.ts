import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { Response } from '../../types/response';

import { EventsService } from './events.service';
import { CreateEventDto } from './dto/createEvent.dto';
import EventsEntity from './entities/events.entity';
import { TransformGetEventsResponseInterceptor } from './interceptors/transform-get-events-response.interceptor';
import { BadRequestExceptionFilter } from '../../filters/bad-request-exception';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { TransformGetEventResponseInterceptor } from './interceptors/transform-get-event-response.interceptor';
import { SearchEventDto } from './dto/searchEvent.dto';
import User from '../users/entities/users.entity';
import { TransformUsersResponseInterceptor } from '../users/interceptors/transform-users-response.interceptor';

@Controller('events')
export class EventsController {
  constructor(private readonly eventService: EventsService) {}
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformGetEventResponseInterceptor)
  @UseFilters(BadRequestExceptionFilter)
  async create(
    @Request() req,
    @Body() createEventDto: CreateEventDto,
  ): Promise<Response<EventsEntity>> {
    const event: EventsEntity = (await this.eventService.create(
      req.user,
      createEventDto,
    )) as EventsEntity;
    if (!event) {
      throw new BadRequestException("You Don't have a company");
    }
    return {
      message: 'Event is created successfully',
      data: event,
    };
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(BadRequestExceptionFilter)
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ): Promise<Response<any>> {
    const result = await this.eventService.update(
      req.user.id,
      id,
      updateEventDto,
    );
    if (!result) {
      throw new BadRequestException('Event not found');
    }
    return {
      message: 'Event is Updated successfully',
      data: {},
    };
  }

  @Get('/company')
  @UseInterceptors(TransformGetEventsResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  async getMyEvents(@Request() req): Promise<Response<EventsEntity[]>> {
    const events: EventsEntity[] = (await this.eventService.getMyEvents(
        req.user,
    )) as EventsEntity[];
    if (!events) {
      throw new BadRequestException('You Do Not Have Company');
    }
    return {
      message: 'Get My Events',
      data: events,
    };
  }


  @Get('/upcoming')
  @UseInterceptors(TransformGetEventsResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  async myUpcomingEvent(@Request() req): Promise<Response<EventsEntity[]>> {
    const events: EventsEntity[] = await this.eventService.myUpcomingEvent(
        req.user.id,
    );
    return {
      message: 'List Events',
      data: events,
    };
  }

  @Get('/past')
  @UseInterceptors(TransformGetEventsResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  async myPastEvent(@Request() req): Promise<Response<EventsEntity[]>> {
    const events: EventsEntity[] = await this.eventService.myPastEvent(
        req.user.id,
    );
    return {
      message: 'List Events',
      data: events,
    };
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UseFilters(BadRequestExceptionFilter)
  async delete(
    @Request() req,
    @Param('id') id: string,
  ): Promise<Response<any>> {
    const result = await this.eventService.delete(req.user.id, id);
    if (!result) {
      throw new BadRequestException('Event not found');
    }
    return {
      message: 'Event is Deleted successfully',
      data: {},
    };
  }

  @Get('/companies/:id')
  @UseInterceptors(TransformGetEventsResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  async getCompanyEvents(
    @Param('id', ParseUUIDPipe) id: string,
    @Request() req
  ): Promise<any> {
    const events: EventsEntity[] = (await this.eventService.getCompanyEvents(
      id,
    )) as EventsEntity[];
    return {
      message: 'Get Company Events',
      data: events,
      userId: req.user.id
    };
  }

  @Get('')
  @UseInterceptors(TransformGetEventsResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  async searchEvents(
    @Query() query: SearchEventDto,
    @Request() req
  ): Promise<any> {
    const events: EventsEntity[] = await this.eventService.searchEvents(query);
    return {
      message: 'List Events',
      data: events,
      userId: req.user.id
    };
  }

  @Post(':id/rsvp')
  @UseGuards(JwtAuthGuard)
  async rsvpEvent(
    @Request() req,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Response<any>> {
    const isRsvp: boolean = await this.eventService.rsvp(req.user.id, id);
    return {
      message: `You ${isRsvp ? 'canceled' : 'rsvp'} event successfully`,
      data: {},
    };
  }

  @Post(':id/users/:userId/attend')
  @UseGuards(JwtAuthGuard)
  async attendEvent(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Response<any>> {
    await this.eventService.attend(userId, id);
    return {
      message: `You register attendance to this event`,
      data: {},
    };
  }

  @Get('/:id/attendance')
  @UseInterceptors(TransformUsersResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  async getAttendanceOfEvents(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Response<User[]>> {
    const users: User[] = await this.eventService.getAttendanceOfEvents(id);
    return {
      message: 'List attendance',
      data: users,
    };
  }

  @Get('/:id/rsvp')
  @UseInterceptors(TransformUsersResponseInterceptor)
  @UseGuards(JwtAuthGuard)
  async getRsvpOfEvents(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Response<User[]>> {
    const users: User[] = await this.eventService.getRsvpOfEvents(id);
    return {
      message: 'List rsvp',
      data: users,
    };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async get(
      @Param('id') id: string
  ): Promise<Response<any>> {
    const result = await this.eventService.getEvent(
        id
    );
    return {
      message: 'Event',
      data: result,
    };
  }
}
