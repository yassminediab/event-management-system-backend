import { Repository } from 'typeorm';
import { Feedback } from './entities/feedback.entity';
import { AddFeedbackDto } from './dto/add-feedback.dto';
import { EventsService } from '../events/events.service';
export declare class FeedbackService {
    private readonly feedbackRepository;
    private readonly eventService;
    constructor(feedbackRepository: Repository<Feedback>, eventService: EventsService);
    create(userId: string, eventId: string, feedback: AddFeedbackDto): Promise<Feedback | boolean>;
    list(eventId: string): Promise<Feedback[]>;
}
