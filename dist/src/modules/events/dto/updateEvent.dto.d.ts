import EventsEntity from '../entities/events.entity';
export declare class UpdateEventDto {
    title: string;
    location: string;
    description: string;
    date: string;
}
export declare class UpdateEventResDto {
    event: EventsEntity;
}
