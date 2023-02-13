import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import User from '../users/entities/users.entity';
import { AddFeedbackDto } from './dto/add-feedback.dto';
import { EventsService } from '../events/events.service';

@Injectable()
export class FeedbackService {
  constructor(
    @Inject('FEEDBACK_REPOSITORY')
    private readonly feedbackRepository: Repository<Feedback>,
    private readonly eventService: EventsService,
  ) {}

  async create(
    userId: string,
    eventId: string,
    feedback: AddFeedbackDto,
  ): Promise<Feedback | boolean> {
    const attendance: User[] = await this.eventService.getAttendanceOfEvents(
      eventId,
    );
    const ifUserAttended: boolean = !!attendance.find(
      (user) => userId == user.id,
    );
    if (!ifUserAttended) {
      return false;
    }
    return this.feedbackRepository.save({
      ...feedback,
      userId: userId,
      eventId: eventId,
    });
  }

  async list(eventId: string): Promise<Feedback[]> {
    return this.feedbackRepository.find({
      where: {
        eventId: eventId,
      },
      relations: ['user'],
    });
  }
}
