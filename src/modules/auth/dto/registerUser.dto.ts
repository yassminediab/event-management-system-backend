import {IsEmail, IsNotEmpty, IsString, Min, MinLength, Validate} from 'class-validator';
import { emailUnique } from '../../users/validators/emailUnique';
import {ApiProperty} from "@nestjs/swagger";

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Validate(emailUnique)
  @ApiProperty()
  email: string;
}
