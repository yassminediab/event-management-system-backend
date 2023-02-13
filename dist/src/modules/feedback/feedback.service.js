"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const events_service_1 = require("../events/events.service");
let FeedbackService = class FeedbackService {
    constructor(feedbackRepository, eventService) {
        this.feedbackRepository = feedbackRepository;
        this.eventService = eventService;
    }
    async create(userId, eventId, feedback) {
        const attendance = await this.eventService.getAttendanceOfEvents(eventId);
        const ifUserAttended = !!attendance.find((user) => userId == user.id);
        if (!ifUserAttended) {
            return false;
        }
        return this.feedbackRepository.save(Object.assign(Object.assign({}, feedback), { userId: userId, eventId: eventId }));
    }
    async list(eventId) {
        return this.feedbackRepository.find({
            where: {
                eventId: eventId,
            },
            relations: ['user'],
        });
    }
};
FeedbackService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('FEEDBACK_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        events_service_1.EventsService])
], FeedbackService);
exports.FeedbackService = FeedbackService;
//# sourceMappingURL=feedback.service.js.map