import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';
import { TransformGetEventResponseInterceptor } from '../events/interceptors/transform-get-event-response.interceptor';
import { BadRequestExceptionFilter } from '../../filters/bad-request-exception';
import { CreateEventDto } from '../events/dto/createEvent.dto';
import { Response } from '../../types/response';
import EventsEntity from '../events/entities/events.entity';
import { AddFeedbackDto } from './dto/add-feedback.dto';
import { Feedback } from './entities/feedback.entity';

@Controller('')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post('events/:id/feedback')
  @UseGuards(JwtAuthGuard)
  @UseFilters(BadRequestExceptionFilter)
  async create(
    @Request() req,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() feedbackDto: AddFeedbackDto,
  ): Promise<Response<Feedback>> {
    const feedback: Feedback = (await this.feedbackService.create(
      req.user.id,
      id,
      feedbackDto,
    )) as Feedback;
    if (!feedback) {
      throw new BadRequestException("You didn't attend the event");
    }
    return {
      message: 'Feedback is created successfully',
      data: feedback,
    };
  }

  @Get('events/:id/feedback')
  @UseGuards(JwtAuthGuard)
  @UseFilters(BadRequestExceptionFilter)
  async list(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<Response<Feedback[]>> {
    const feedback: Feedback[] = await this.feedbackService.list(id);
    return {
      message: 'List of Feedback',
      data: feedback,
    };
  }
}
