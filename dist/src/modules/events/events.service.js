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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const companies_service_1 = require("../companies/companies.service");
const user_service_1 = require("../users/user.service");
const event_emitter_1 = require("@nestjs/event-emitter");
const event_created_event_1 = require("./events/event-created.event");
let EventsService = class EventsService {
    constructor(eventRepository, companyService, userService, eventEmitter) {
        this.eventRepository = eventRepository;
        this.companyService = companyService;
        this.userService = userService;
        this.eventEmitter = eventEmitter;
    }
    async create(user, eventDto) {
        const company = await this.companyService.checkIfCompanyExists(user.id);
        if (!company) {
            return false;
        }
        const event = await this.eventRepository.save(Object.assign(Object.assign({}, eventDto), { companyId: company.id }));
        const eventCreatedEvent = new event_created_event_1.EventCreatedEvent();
        eventCreatedEvent.event = event;
        this.eventEmitter.emit('event.created', eventCreatedEvent);
        return event;
    }
    async update(userId, eventId, eventDto) {
        const company = await this.companyService.checkIfCompanyExists(userId);
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['company'],
        });
        if (!company || !event || (event === null || event === void 0 ? void 0 : event.companyId) !== company.id) {
            return false;
        }
        return this.eventRepository.update({ id: eventId }, Object.assign({}, eventDto));
    }
    async getMyEvents(user) {
        const company = await this.companyService.checkIfCompanyExists(user.id);
        if (!company) {
            return false;
        }
        return this.eventRepository.find({
            where: { companyId: company.id },
            relations: ['company'],
            order: { createdAt: 'DESC' },
        });
    }
    async getEvent(eventId) {
        return this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['company'],
            order: { createdAt: 'DESC' },
        });
    }
    async getCompanyEvents(companyId) {
        return this.eventRepository.find({
            where: { companyId: companyId },
            relations: ['company'],
            order: { createdAt: 'DESC' },
        });
    }
    async searchEvents(query) {
        const eventQuery = this.eventRepository.createQueryBuilder('events')
            .leftJoinAndSelect('events.rsvp', 'rsvp')
            .leftJoinAndSelect('events.rsvp', 'users')
            .leftJoinAndSelect('events.company', 'companies');
        if (query.keyword) {
            eventQuery.where('events.title like :title', {
                title: `%${query.keyword}%`,
            });
        }
        if (query.location) {
            eventQuery.where('events.location = :location', {
                location: query.location,
            });
        }
        if (query.from && query.to) {
            eventQuery.where(`events.date BETWEEN '${query.from}' AND '${query.to}'`);
        }
        return eventQuery.orderBy('"events"."createdAt"', 'DESC').getMany();
    }
    async delete(userId, eventId) {
        const company = await this.companyService.checkIfCompanyExists(userId);
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['company'],
        });
        if (!company || !event || (event === null || event === void 0 ? void 0 : event.companyId) !== company.id) {
            return false;
        }
        return this.eventRepository.softDelete({ id: eventId });
    }
    async rsvp(userId, eventId) {
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['rsvp'],
        });
        const user = await this.userService.getUser(userId);
        const isRsvpEvent = !!event.rsvp.find((user) => user.id == userId);
        if (!isRsvpEvent) {
            event.rsvp.push(user);
            event.numberOfRsvp = event.numberOfRsvp + 1;
        }
        else {
            event.rsvp = event.rsvp.filter((user) => {
                return user.id !== userId;
            });
            event.numberOfRsvp = event.numberOfRsvp - 1;
        }
        await this.eventRepository.save(event);
        return isRsvpEvent;
    }
    async attend(userId, eventId) {
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['attendance'],
        });
        const user = await this.userService.getUser(userId);
        const isAttendedEvent = !!event.attendance.find((user) => user.id == userId);
        if (!isAttendedEvent) {
            event.attendance.push(user);
            event.numberOfAttendance = event.numberOfAttendance + 1;
        }
        await this.eventRepository.save(event);
        return isAttendedEvent;
    }
    async myUpcomingEvent(userId) {
        const eventQuery = this.eventRepository
            .createQueryBuilder('events')
            .leftJoinAndSelect('events.company', 'companies')
            .leftJoinAndSelect('events.rsvp', 'rsvp')
            .leftJoinAndSelect('events.rsvp', 'users')
            .where('events.date > :date', { date: new Date() })
            .andWhere('users.id = :userId', { userId: userId });
        return eventQuery.getMany();
    }
    async myPastEvent(userId) {
        const eventQuery = this.eventRepository
            .createQueryBuilder('events')
            .leftJoinAndSelect('events.company', 'companies')
            .leftJoinAndSelect('events.attendance', 'attendance')
            .leftJoinAndSelect('events.attendance', 'users')
            .where('events.date < :date', { date: new Date() })
            .andWhere('users.id = :userId', { userId: userId });
        return eventQuery.getMany();
    }
    async getAttendanceOfEvents(eventId) {
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['attendance'],
        });
        return event.attendance;
    }
    async getRsvpOfEvents(eventId) {
        const event = await this.eventRepository.findOne({
            where: { id: eventId },
            relations: ['rsvp', 'attendance'],
        });
        return event.rsvp;
    }
};
EventsService = __decorate([
    __param(0, (0, common_1.Inject)('EVENT_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        companies_service_1.CompanyService,
        user_service_1.UserService,
        event_emitter_1.EventEmitter2])
], EventsService);
exports.EventsService = EventsService;
//# sourceMappingURL=events.service.js.map