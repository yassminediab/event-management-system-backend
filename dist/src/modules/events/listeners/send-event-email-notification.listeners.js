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
exports.SendEventEmailNotification = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const event_created_event_1 = require("../events/event-created.event");
const companies_service_1 = require("../../companies/companies.service");
const lodash_1 = require("lodash");
const mailtrap_provider_1 = require("../../../mail-providers/mailtrap.provider");
const config_1 = require("@nestjs/config");
let SendEventEmailNotification = class SendEventEmailNotification {
    constructor(companyService, mailtrapProvider, configService) {
        this.companyService = companyService;
        this.mailtrapProvider = mailtrapProvider;
        this.configService = configService;
    }
    async handleEventCreatedEvent({ event }) {
        const company = await this.companyService.findCompanyById(event.companyId);
        const emails = (0, lodash_1.map)(company.followers, 'email');
        for (const email of emails) {
            await this.mailtrapProvider.send({
                from: this.configService.get('mailTrap.from'),
                to: email,
                subject: `New event created from ${company.title}`,
                text: `There is new coming event '${event.title} in ${event.location} at ${event.date} which you might be interested on it'`
            });
        }
    }
};
__decorate([
    (0, event_emitter_1.OnEvent)('event.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_created_event_1.EventCreatedEvent]),
    __metadata("design:returntype", Promise)
], SendEventEmailNotification.prototype, "handleEventCreatedEvent", null);
SendEventEmailNotification = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [companies_service_1.CompanyService,
        mailtrap_provider_1.MailtrapProvider,
        config_1.ConfigService])
], SendEventEmailNotification);
exports.SendEventEmailNotification = SendEventEmailNotification;
//# sourceMappingURL=send-event-email-notification.listeners.js.map