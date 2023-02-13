import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import User from '../users/entities/users.entity';
import EventsEntity from './entities/events.entity';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { CompanyService } from '../companies/companies.service';
import { SearchEventDto } from './dto/searchEvent.dto';
import { UserService } from '../users/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import {EventCreatedEvent} from "./events/event-created.event";

export class EventsService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private readonly eventRepository: Repository<EventsEntity>,
    private readonly companyService: CompanyService,
    private readonly userService: UserService,
    private eventEmitter: EventEmitter2
  ) {}

  async create(
    user: User,
    eventDto: CreateEventDto,
  ): Promise<EventsEntity | boolean> {
    const company = await this.companyService.checkIfCompanyExists(user.id);
    if (!company) {
      return false;
    }
    const event: EventsEntity = await this.eventRepository.save({
      ...eventDto,
      companyId: company.id,
    });
    const eventCreatedEvent = new EventCreatedEvent();
    eventCreatedEvent.event = event;
    this.eventEmitter.emit('event.created', eventCreatedEvent);
    return event;
  }

  async update(
    userId: string,
    eventId: string,
    eventDto: UpdateEventDto,
  ): Promise<any> {
    const company = await this.companyService.checkIfCompanyExists(userId);
    const event: EventsEntity = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['company'],
    });
    if (!company || !event || event?.companyId !== company.id) {
      return false;
    }
    return this.eventRepository.update(
      { id: eventId },
      {
        ...eventDto,
      },
    );
  }

  async getMyEvents(user: User): Promise<EventsEntity[] | boolean> {
    const company = await this.companyService.checkIfCompanyExists(user.id);
    if (!company) {
      return false;
    }
    return this.eventRepository.find({
      where: { companyId: company.id },
      relations: ['company'],
      order: { createdAt: 'DESC' },
    });
  }

  async getEvent(eventId: string): Promise<EventsEntity> {
    return this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['company'],
      order: { createdAt: 'DESC' },
    });
  }

  async getCompanyEvents(companyId: string): Promise<EventsEntity[] | boolean> {
    return this.eventRepository.find({
      where: { companyId: companyId },
      relations: ['company'],
      order: { createdAt: 'DESC' },
    });
  }

  async searchEvents(query: SearchEventDto): Promise<EventsEntity[]> {
    const eventQuery = this.eventRepository.createQueryBuilder('events')
        .leftJoinAndSelect('events.rsvp', 'rsvp')
        .leftJoinAndSelect('events.rsvp','users')
        .leftJoinAndSelect('events.company','companies');
    if (query.keyword) {
      eventQuery.where('events.title like :title', {
        title: `%${query.keyword}%`,
      });
    }
    if (query.location) {
      eventQuery.where('events.location = :location', {
        location: query.location,
      });
    }

    if (query.from && query.to) {
      eventQuery.where(`events.date BETWEEN '${query.from}' AND '${query.to}'`);
    }

    return eventQuery.orderBy('"events"."createdAt"','DESC').getMany();
  }

  async delete(userId: string, eventId: string) {
    const company = await this.companyService.checkIfCompanyExists(userId);
    const event: EventsEntity = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['company'],
    });
    if (!company || !event || event?.companyId !== company.id) {
      return false;
    }
    return this.eventRepository.softDelete({ id: eventId });
  }

  async rsvp(userId: string, eventId: string): Promise<boolean> {
    const event: EventsEntity = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['rsvp'],
    });
    const user: User = await this.userService.getUser(userId);
    const isRsvpEvent: boolean = !!event.rsvp.find((user) => user.id == userId);
    if (!isRsvpEvent) {
      event.rsvp.push(user);
      event.numberOfRsvp = event.numberOfRsvp + 1;
    } else {
      event.rsvp = event.rsvp.filter((user) => {
        return user.id !== userId;
      });
      event.numberOfRsvp = event.numberOfRsvp - 1;
    }
    await this.eventRepository.save(event);
    return isRsvpEvent;
  }

  async attend(userId: string, eventId: string): Promise<boolean> {
    const event: EventsEntity = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['attendance'],
    });
    const user: User = await this.userService.getUser(userId);
    const isAttendedEvent: boolean = !!event.attendance.find(
      (user) => user.id == userId,
    );
    if (!isAttendedEvent) {
      event.attendance.push(user);
      event.numberOfAttendance = event.numberOfAttendance + 1;
    }
    await this.eventRepository.save(event);
    return isAttendedEvent;
  }

  async myUpcomingEvent(userId: string): Promise<EventsEntity[]> {
    const eventQuery = this.eventRepository
      .createQueryBuilder('events')
      .leftJoinAndSelect('events.company', 'companies')
      .leftJoinAndSelect('events.rsvp', 'rsvp')
      .leftJoinAndSelect('events.rsvp', 'users')
      .where('events.date > :date', { date: new Date() })
      .andWhere('users.id = :userId', { userId: userId });
    return eventQuery.getMany();
  }

  async myPastEvent(userId: string): Promise<EventsEntity[]> {
    const eventQuery = this.eventRepository
      .createQueryBuilder('events')
      .leftJoinAndSelect('events.company', 'companies')
      .leftJoinAndSelect('events.attendance', 'attendance')
      .leftJoinAndSelect('events.attendance', 'users')
      .where('events.date < :date', { date: new Date() })
      .andWhere('users.id = :userId', { userId: userId });
    return eventQuery.getMany();
  }

  async getAttendanceOfEvents(eventId: string): Promise<User[]> {
    const event: EventsEntity = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['attendance'],
    });
    return event.attendance;
  }

  async getRsvpOfEvents(eventId: string): Promise<User[]> {
    const event: EventsEntity = await this.eventRepository.findOne({
      where: { id: eventId },
      relations: ['rsvp', 'attendance'],
    });
    return event.rsvp;
  }
}
