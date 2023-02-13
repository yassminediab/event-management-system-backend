import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request, UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import User from './entities/users.entity';
import { Response } from '../../types/response';
import { TransformRegisterResponseInterceptor } from '../auth/interceptors/transform-register-response.interceptor';
import { EditUserDto } from './dto/editProfile.dto';
import {BadRequestExceptionFilter} from "../../filters/bad-request-exception";
import {EditCompanyProfileDto} from "./dto/editCompanyProfile.dto";

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @UseInterceptors(TransformRegisterResponseInterceptor)
  async getProfile(@Request() req): Promise<Response<User>> {
    const user: User = await this.userService.getUser(req.user?.id)
    return {
      message: 'Get profile',
      data: user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  @UseInterceptors(TransformRegisterResponseInterceptor)
  @UseFilters(BadRequestExceptionFilter)
  async editProfile(
    @Request() req,
    @Body() editProfileDto: EditUserDto,
  ): Promise<Response<any>> {
    await this.userService.update(req.user, editProfileDto);
    return {
      message: 'Profile is updated successfully',
      data: {},
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('company/profile')
  @UseInterceptors(TransformRegisterResponseInterceptor)
  @UseFilters(BadRequestExceptionFilter)
  async editCompanyProfile(
      @Request() req,
      @Body() editProfileDto: EditCompanyProfileDto,
  ): Promise<Response<any>> {
    await this.userService.editCompanyProfile(req.user, editProfileDto);
    return {
      message: 'Company Profile is updated successfully',
      data: {},
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('companies/:id/follow')
  async followCompany(
    @Request() req,
    @Param('id') id: string,
  ): Promise<Response<any>> {
    const followed: boolean = await this.userService.follow(req.user.id, id);
    return {
      message: `You ${
        followed ? 'unfollowed' : 'followed'
      } company successfully`,
      data: {},
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('following')
  async getFollowingCompanies(@Request() req): Promise<Response<any>> {
    const user: User = await this.userService.getFollowing(req.user.id);
    return {
      message: ``,
      data: user.following,
    };
  }
}
