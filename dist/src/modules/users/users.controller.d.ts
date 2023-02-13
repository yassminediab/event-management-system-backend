import { UserService } from './user.service';
import User from './entities/users.entity';
import { Response } from '../../types/response';
import { EditUserDto } from './dto/editProfile.dto';
import { EditCompanyProfileDto } from "./dto/editCompanyProfile.dto";
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<Response<User>>;
    editProfile(req: any, editProfileDto: EditUserDto): Promise<Response<any>>;
    editCompanyProfile(req: any, editProfileDto: EditCompanyProfileDto): Promise<Response<any>>;
    followCompany(req: any, id: string): Promise<Response<any>>;
    getFollowingCompanies(req: any): Promise<Response<any>>;
}
