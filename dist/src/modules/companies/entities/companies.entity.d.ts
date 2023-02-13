import { User } from '../../users/entities/users.entity';
export declare class Company {
    id: string;
    title: string;
    userId: string;
    numberOfFollowers: number;
    user?: User;
    events?: Event[];
    followers?: User[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}
export default Company;
