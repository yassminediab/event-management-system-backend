import { IsEmail, IsNotEmpty, IsString, Min, Validate } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
export class EditUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;
}
