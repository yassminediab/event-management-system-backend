import { IsEmail, IsNotEmpty, IsString, Min } from 'class-validator';
import Company from '../entities/companies.entity';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCompanyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;
}

export class UpdateCompanyResDto {
  company: Company;
}
