import EventsEntity from '../entities/events.entity';
export declare class CreateEventDto {
    title: string;
    location: string;
    description: string;
    date: string;
}
export declare class CreateEventResDto {
    event: EventsEntity;
}
