import { IsEmail, IsNotEmpty, IsString, Min, Validate } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";
export class EditCompanyProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  title: string;
}
