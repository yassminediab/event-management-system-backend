import { Response } from '../../types/response';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/createEvent.dto';
import EventsEntity from './entities/events.entity';
import { UpdateEventDto } from './dto/updateEvent.dto';
import { SearchEventDto } from './dto/searchEvent.dto';
import User from '../users/entities/users.entity';
export declare class EventsController {
    private readonly eventService;
    constructor(eventService: EventsService);
    create(req: any, createEventDto: CreateEventDto): Promise<Response<EventsEntity>>;
    update(req: any, id: string, updateEventDto: UpdateEventDto): Promise<Response<any>>;
    getMyEvents(req: any): Promise<Response<EventsEntity[]>>;
    myUpcomingEvent(req: any): Promise<Response<EventsEntity[]>>;
    myPastEvent(req: any): Promise<Response<EventsEntity[]>>;
    delete(req: any, id: string): Promise<Response<any>>;
    getCompanyEvents(id: string, req: any): Promise<any>;
    searchEvents(query: SearchEventDto, req: any): Promise<any>;
    rsvpEvent(req: any, id: string): Promise<Response<any>>;
    attendEvent(userId: string, id: string): Promise<Response<any>>;
    getAttendanceOfEvents(id: string): Promise<Response<User[]>>;
    getRsvpOfEvents(id: string): Promise<Response<User[]>>;
    get(id: string): Promise<Response<any>>;
}
