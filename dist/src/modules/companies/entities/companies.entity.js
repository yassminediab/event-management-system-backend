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
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("../../users/entities/users.entity");
const events_entity_1 = require("../../events/entities/events.entity");
let Company = class Company {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Company.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Company.prototype, "numberOfFollowers", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'id' }),
    (0, typeorm_1.OneToOne)((type) => users_entity_1.User, (user) => user.company),
    __metadata("design:type", users_entity_1.User)
], Company.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => events_entity_1.EventsEntity, (event) => event.company),
    __metadata("design:type", Array)
], Company.prototype, "events", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)((type) => users_entity_1.User, (user) => user.following),
    __metadata("design:type", Array)
], Company.prototype, "followers", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Company.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Company.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Company.prototype, "deletedAt", void 0);
Company = __decorate([
    (0, typeorm_1.Entity)()
], Company);
exports.Company = Company;
exports.default = Company;
//# sourceMappingURL=companies.entity.js.map