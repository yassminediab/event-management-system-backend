import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class AddFeedbackDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  feedback: string;
}
