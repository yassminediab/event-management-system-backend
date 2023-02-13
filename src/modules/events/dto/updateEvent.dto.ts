import { IsDate, IsNotEmpty, IsString, MinDate } from 'class-validator';
import EventsEntity from '../entities/events.entity';
import { Transform } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class UpdateEventDto {
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
  @MinDate(new Date())
  @ApiProperty()
  date: string;
}

export class UpdateEventResDto {
  event: EventsEntity;
}
