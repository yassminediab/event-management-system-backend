import { EventsEntity } from '../../events/entities/events.entity';
import User from '../../users/entities/users.entity';
export declare class Feedback {
    id: string;
    feedback: string;
    eventId: string;
    userId: string;
    event: EventsEntity;
    user: User;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export default EventsEntity;
