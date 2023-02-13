import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  MinDate,
} from 'class-validator';
import EventsEntity from '../entities/events.entity';
import { Transform } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @Transform(({ value }) => value && new Date(value))
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  @MinDate(new Date())
  date: string;
}

export class CreateEventResDto {
  event: EventsEntity;
}
