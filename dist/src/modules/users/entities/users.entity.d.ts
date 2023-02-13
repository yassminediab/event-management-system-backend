import { Company } from '../../companies/entities/companies.entity';
import { EventsEntity } from '../../events/entities/events.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';
export declare class User {
    id: string;
    name: string;
    email: string;
    password: string;
    company: Company;
    rsvp: EventsEntity[];
    attendance: EventsEntity[];
    following: Company[];
    feedback?: Feedback[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export default User;
