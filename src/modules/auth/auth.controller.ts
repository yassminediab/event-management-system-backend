import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UnauthorizedException,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { Response } from '../../types/response';
import User from '../users/entities/users.entity';
import { TransformRegisterResponseInterceptor } from './interceptors/transform-register-response.interceptor';
import { LoginUserDto, LoginUserResDto } from './dto/loginUser.dto';
import { TransformLoginResponseInterceptor } from './interceptors/transform-login-response.interceptor';
import { NotAuthorizedExceptionFilter } from '../../filters/unauthorized-exception';
import {RegisterCompanyDto} from "./dto/registerCompany.dto";
import {BadRequestExceptionFilter} from "../../filters/bad-request-exception";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UseInterceptors(TransformRegisterResponseInterceptor)
  @UseFilters(BadRequestExceptionFilter)
  async register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<Response<User>> {
    return {
      message: 'User is created successfully',
      data: await this.authService.register(registerUserDto),
    };
  }

  @Post('register/company')
  @UseInterceptors(TransformRegisterResponseInterceptor)
  @UseFilters(BadRequestExceptionFilter)
  async registerAsCompany(
      @Body() registerUserDto: RegisterCompanyDto,
  ): Promise<Response<User>> {
    return {
      message: 'User is created successfully',
      data: await this.authService.registerAsCompany(registerUserDto),
    };
  }

  @Post('login')
  @UseInterceptors(TransformLoginResponseInterceptor)
  @UseFilters(NotAuthorizedExceptionFilter)
  async login(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<Response<LoginUserResDto>> {
    const res: LoginUserResDto = await this.authService.login(loginUserDto);
    if (res) {
      return {
        message: '',
        data: res,
      };
    }
    throw new UnauthorizedException('Invalid email or password');
  }
}
