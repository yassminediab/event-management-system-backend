import { Company } from '../../companies/entities/companies.entity';
import User from '../../users/entities/users.entity';
import { Feedback } from '../../feedback/entities/feedback.entity';
export declare class EventsEntity {
    id: string;
    title: string;
    location: string;
    description: string;
    companyId: string;
    date: Date;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
    numberOfAttendance: number;
    numberOfRsvp: number;
    company: Company;
    rsvp: User[];
    attendance: User[];
    feedback?: Feedback[];
}
export default EventsEntity;
