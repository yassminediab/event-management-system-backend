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
exports.User = void 0;
const typeorm_1 = require("typeorm");
const companies_entity_1 = require("../../companies/entities/companies.entity");
const events_entity_1 = require("../../events/entities/events.entity");
const feedback_entity_1 = require("../../feedback/entities/feedback.entity");
let User = class User {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => companies_entity_1.Company, (company) => company.user, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", companies_entity_1.Company)
], User.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.JoinTable)({ name: 'rsvp' }),
    (0, typeorm_1.ManyToMany)((type) => events_entity_1.EventsEntity, (event) => event.rsvp),
    __metadata("design:type", Array)
], User.prototype, "rsvp", void 0);
__decorate([
    (0, typeorm_1.JoinTable)({ name: 'attendance' }),
    (0, typeorm_1.ManyToMany)((type) => events_entity_1.EventsEntity, (event) => event.attendance),
    __metadata("design:type", Array)
], User.prototype, "attendance", void 0);
__decorate([
    (0, typeorm_1.JoinTable)({ name: 'company_followers' }),
    (0, typeorm_1.ManyToMany)((type) => companies_entity_1.Company, (company) => company.followers),
    __metadata("design:type", Array)
], User.prototype, "following", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => feedback_entity_1.Feedback, (feedback) => feedback.user),
    __metadata("design:type", Array)
], User.prototype, "feedback", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], User.prototype, "deletedAt", void 0);
User = __decorate([
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
exports.default = User;
//# sourceMappingURL=users.entity.js.map