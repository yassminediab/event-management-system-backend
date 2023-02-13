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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsEntity = void 0;
const typeorm_1 = require("typeorm");
const companies_entity_1 = require("../../companies/entities/companies.entity");
const users_entity_1 = require("../../users/entities/users.entity");
const feedback_entity_1 = require("../../feedback/entities/feedback.entity");
let EventsEntity = class EventsEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], EventsEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventsEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventsEntity.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventsEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], EventsEntity.prototype, "companyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], EventsEntity.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], EventsEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], EventsEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], EventsEntity.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], EventsEntity.prototype, "numberOfAttendance", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], EventsEntity.prototype, "numberOfRsvp", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'companyId', referencedColumnName: 'id' }),
    (0, typeorm_1.ManyToOne)((type) => companies_entity_1.Company, (company) => company.events),
    __metadata("design:type", companies_entity_1.Company)
], EventsEntity.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => users_entity_1.default, (user) => user.rsvp, { eager: true }),
    __metadata("design:type", Array)
], EventsEntity.prototype, "rsvp", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => users_entity_1.default, (user) => user.attendance),
    __metadata("design:type", Array)
], EventsEntity.prototype, "attendance", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => feedback_entity_1.Feedback, (feedback) => feedback.event),
    __metadata("design:type", Array)
], EventsEntity.prototype, "feedback", void 0);
EventsEntity = __decorate([
    (0, typeorm_1.Entity)('event')
], EventsEntity);
exports.EventsEntity = EventsEntity;
exports.default = EventsEntity;
//# sourceMappingURL=events.entity.js.map