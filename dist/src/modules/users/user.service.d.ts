import { Repository } from 'typeorm';
import User from './entities/users.entity';
import { EditUserDto } from './dto/editProfile.dto';
import { CompanyService } from '../companies/companies.service';
import { EditCompanyProfileDto } from "./dto/editCompanyProfile.dto";
export declare class UserService {
    private readonly userRepository;
    private readonly companyService;
    constructor(userRepository: Repository<User>, companyService: CompanyService);
    update(user: User, updatedUser: EditUserDto): Promise<import("typeorm").UpdateResult>;
    editCompanyProfile(user: User, updatedUser: EditCompanyProfileDto): Promise<void>;
    follow(userId: string, companyId: string): Promise<boolean>;
    getFollowing(userId: string): Promise<User>;
    getUser(userId: string): Promise<User>;
}
