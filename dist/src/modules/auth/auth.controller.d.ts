import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { Response } from '../../types/response';
import User from '../users/entities/users.entity';
import { LoginUserDto, LoginUserResDto } from './dto/loginUser.dto';
import { RegisterCompanyDto } from "./dto/registerCompany.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerUserDto: RegisterUserDto): Promise<Response<User>>;
    registerAsCompany(registerUserDto: RegisterCompanyDto): Promise<Response<User>>;
    login(loginUserDto: LoginUserDto): Promise<Response<LoginUserResDto>>;
}
