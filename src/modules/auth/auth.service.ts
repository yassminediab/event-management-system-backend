import { Inject, Injectable, Request } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import User from '../users/entities/users.entity';
import { RegisterUserDto } from './dto/registerUser.dto';
import { LoginUserDto, LoginUserResDto } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import Company from "../companies/entities/companies.entity";
import {RegisterCompanyDto} from "./dto/registerCompany.dto";

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
    @Inject('COMPANY_REPOSITORY')
    private readonly companyRepository: Repository<Company>,
    ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const hash = await bcrypt.hash(registerUserDto.password, 12);

    return this.userRepository.save({
      ...registerUserDto,
      password: hash,
    });
  }

  async registerAsCompany(registerUserDto: RegisterCompanyDto): Promise<User> {
    const hash = await bcrypt.hash(registerUserDto.password, 12);

    const user : User = await this.userRepository.save({
      ...registerUserDto,
      password: hash,
    });

    await this.companyRepository.save({
      title: registerUserDto?.companyTitle,
      userId: user?.id
    });
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const user: User = await this.userRepository.findOne({
      where: { email: loginUserDto.email }, relations: ['company']
    });
    if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
      const jwt: string = await this.jwtService.signAsync(
        {
          ...user,
        },
        { secret: 'jwtSecret' },
      );
      return { user: user, token: jwt };
    }
  }
}
