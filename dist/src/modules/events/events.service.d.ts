import { Repository } from 'typeorm';
import User from '../users/entities/users.entity';
import EventsEntity from './entities/events.entity';
import { CreateEventDto } from './dto/createEvent.dto';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { CompanyService } from '../companies/companies.service';
import { SearchEventDto } from './dto/searchEvent.dto';
import { UserService } from '../users/user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class EventsService {
    private readonly eventRepository;
    private readonly companyService;
    private readonly userService;
    private eventEmitter;
    constructor(eventRepository: Repository<EventsEntity>, companyService: CompanyService, userService: UserService, eventEmitter: EventEmitter2);
    create(user: User, eventDto: CreateEventDto): Promise<EventsEntity | boolean>;
    update(userId: string, eventId: string, eventDto: UpdateEventDto): Promise<any>;
    getMyEvents(user: User): Promise<EventsEntity[] | boolean>;
    getEvent(eventId: string): Promise<EventsEntity>;
    getCompanyEvents(companyId: string): Promise<EventsEntity[] | boolean>;
    searchEvents(query: SearchEventDto): Promise<EventsEntity[]>;
    delete(userId: string, eventId: string): Promise<false | import("typeorm").UpdateResult>;
    rsvp(userId: string, eventId: string): Promise<boolean>;
    attend(userId: string, eventId: string): Promise<boolean>;
    myUpcomingEvent(userId: string): Promise<EventsEntity[]>;
    myPastEvent(userId: string): Promise<EventsEntity[]>;
    getAttendanceOfEvents(eventId: string): Promise<User[]>;
    getRsvpOfEvents(eventId: string): Promise<User[]>;
}
