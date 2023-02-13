import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinDate,
} from 'class-validator';
import EventsEntity from '../entities/events.entity';
import { Transform } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class SearchEventDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  keyword: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  location: string;

  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @IsOptional()
  @ApiProperty()
  from: Date;

  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @IsOptional()
  @ApiProperty()
  to: Date;
}
