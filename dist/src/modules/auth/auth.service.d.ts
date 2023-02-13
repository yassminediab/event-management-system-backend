import { Repository } from 'typeorm';
import User from '../users/entities/users.entity';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import Company from "../companies/entities/companies.entity";
import { RegisterCompanyDto } from "./dto/registerCompany.dto";
export declare class AuthService {
    private readonly userRepository;
    private jwtService;
    private readonly companyRepository;
    constructor(userRepository: Repository<User>, jwtService: JwtService, companyRepository: Repository<Company>);
    register(registerUserDto: RegisterUserDto): Promise<User>;
    registerAsCompany(registerUserDto: RegisterCompanyDto): Promise<User>;
    login(loginUserDto: LoginUserDto): Promise<{
        user: User;
        token: string;
    }>;
}
