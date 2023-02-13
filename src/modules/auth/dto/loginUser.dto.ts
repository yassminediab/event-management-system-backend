import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';
import User from '../../users/entities/users.entity';
import {ApiProperty} from "@nestjs/swagger";

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}

export class LoginUserResDto {
  @ApiProperty()
  token: string;
  @ApiProperty()
  user: User;
}
