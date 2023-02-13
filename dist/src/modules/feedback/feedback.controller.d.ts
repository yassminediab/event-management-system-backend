import { FeedbackService } from './feedback.service';
import { Response } from '../../types/response';
import { AddFeedbackDto } from './dto/add-feedback.dto';
import { Feedback } from './entities/feedback.entity';
export declare class FeedbackController {
    private readonly feedbackService;
    constructor(feedbackService: FeedbackService);
    create(req: any, id: string, feedbackDto: AddFeedbackDto): Promise<Response<Feedback>>;
    list(id: string): Promise<Response<Feedback[]>>;
}
