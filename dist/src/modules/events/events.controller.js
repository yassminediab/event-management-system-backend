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
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth-guard");
const events_service_1 = require("./events.service");
const createEvent_dto_1 = require("./dto/createEvent.dto");
const transform_get_events_response_interceptor_1 = require("./interceptors/transform-get-events-response.interceptor");
const bad_request_exception_1 = require("../../filters/bad-request-exception");
const updateEvent_dto_1 = require("./dto/updateEvent.dto");
const transform_get_event_response_interceptor_1 = require("./interceptors/transform-get-event-response.interceptor");
const searchEvent_dto_1 = require("./dto/searchEvent.dto");
const transform_users_response_interceptor_1 = require("../users/interceptors/transform-users-response.interceptor");
let EventsController = class EventsController {
    constructor(eventService) {
        this.eventService = eventService;
    }
    async create(req, createEventDto) {
        const event = (await this.eventService.create(req.user, createEventDto));
        if (!event) {
            throw new common_1.BadRequestException("You Don't have a company");
        }
        return {
            message: 'Event is created successfully',
            data: event,
        };
    }
    async update(req, id, updateEventDto) {
        const result = await this.eventService.update(req.user.id, id, updateEventDto);
        if (!result) {
            throw new common_1.BadRequestException('Event not found');
        }
        return {
            message: 'Event is Updated successfully',
            data: {},
        };
    }
    async getMyEvents(req) {
        const events = (await this.eventService.getMyEvents(req.user));
        if (!events) {
            throw new common_1.BadRequestException('You Do Not Have Company');
        }
        return {
            message: 'Get My Events',
            data: events,
        };
    }
    async myUpcomingEvent(req) {
        const events = await this.eventService.myUpcomingEvent(req.user.id);
        return {
            message: 'List Events',
            data: events,
        };
    }
    async myPastEvent(req) {
        const events = await this.eventService.myPastEvent(req.user.id);
        return {
            message: 'List Events',
            data: events,
        };
    }
    async delete(req, id) {
        const result = await this.eventService.delete(req.user.id, id);
        if (!result) {
            throw new common_1.BadRequestException('Event not found');
        }
        return {
            message: 'Event is Deleted successfully',
            data: {},
        };
    }
    async getCompanyEvents(id, req) {
        const events = (await this.eventService.getCompanyEvents(id));
        return {
            message: 'Get Company Events',
            data: events,
            userId: req.user.id
        };
    }
    async searchEvents(query, req) {
        const events = await this.eventService.searchEvents(query);
        return {
            message: 'List Events',
            data: events,
            userId: req.user.id
        };
    }
    async rsvpEvent(req, id) {
        const isRsvp = await this.eventService.rsvp(req.user.id, id);
        return {
            message: `You ${isRsvp ? 'canceled' : 'rsvp'} event successfully`,
            data: {},
        };
    }
    async attendEvent(userId, id) {
        await this.eventService.attend(userId, id);
        return {
            message: `You register attendance to this event`,
            data: {},
        };
    }
    async getAttendanceOfEvents(id) {
        const users = await this.eventService.getAttendanceOfEvents(id);
        return {
            message: 'List attendance',
            data: users,
        };
    }
    async getRsvpOfEvents(id) {
        const users = await this.eventService.getRsvpOfEvents(id);
        return {
            message: 'List rsvp',
            data: users,
        };
    }
    async get(id) {
        const result = await this.eventService.getEvent(id);
        return {
            message: 'Event',
            data: result,
        };
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)(transform_get_event_response_interceptor_1.TransformGetEventResponseInterceptor),
    (0, common_1.UseFilters)(bad_request_exception_1.BadRequestExceptionFilter),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createEvent_dto_1.CreateEventDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseFilters)(bad_request_exception_1.BadRequestExceptionFilter),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, updateEvent_dto_1.UpdateEventDto]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('/company'),
    (0, common_1.UseInterceptors)(transform_get_events_response_interceptor_1.TransformGetEventsResponseInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getMyEvents", null);
__decorate([
    (0, common_1.Get)('/upcoming'),
    (0, common_1.UseInterceptors)(transform_get_events_response_interceptor_1.TransformGetEventsResponseInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "myUpcomingEvent", null);
__decorate([
    (0, common_1.Get)('/past'),
    (0, common_1.UseInterceptors)(transform_get_events_response_interceptor_1.TransformGetEventsResponseInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "myPastEvent", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseFilters)(bad_request_exception_1.BadRequestExceptionFilter),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('/companies/:id'),
    (0, common_1.UseInterceptors)(transform_get_events_response_interceptor_1.TransformGetEventsResponseInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getCompanyEvents", null);
__decorate([
    (0, common_1.Get)(''),
    (0, common_1.UseInterceptors)(transform_get_events_response_interceptor_1.TransformGetEventsResponseInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [searchEvent_dto_1.SearchEventDto, Object]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "searchEvents", null);
__decorate([
    (0, common_1.Post)(':id/rsvp'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "rsvpEvent", null);
__decorate([
    (0, common_1.Post)(':id/users/:userId/attend'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('userId', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "attendEvent", null);
__decorate([
    (0, common_1.Get)('/:id/attendance'),
    (0, common_1.UseInterceptors)(transform_users_response_interceptor_1.TransformUsersResponseInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getAttendanceOfEvents", null);
__decorate([
    (0, common_1.Get)('/:id/rsvp'),
    (0, common_1.UseInterceptors)(transform_users_response_interceptor_1.TransformUsersResponseInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "getRsvpOfEvents", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "get", null);
EventsController = __decorate([
    (0, common_1.Controller)('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map