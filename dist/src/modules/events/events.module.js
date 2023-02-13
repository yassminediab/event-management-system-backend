"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const events_controller_1 = require("./events.controller");
const events_service_1 = require("./events.service");
const database_module_1 = require("../../database/database.module");
const event_providers_1 = require("./event.providers");
const companies_service_1 = require("../companies/companies.service");
const company_providers_1 = require("../companies/company.providers");
const user_service_1 = require("../users/user.service");
const user_providers_1 = require("../users/user.providers");
const send_event_email_notification_listeners_1 = require("./listeners/send-event-email-notification.listeners");
const mailtrap_provider_1 = require("../../mail-providers/mailtrap.provider");
const send_event_notification_sockets_listeners_1 = require("./listeners/send-event-notification-sockets.listeners");
let EventsModule = class EventsModule {
};
EventsModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [events_controller_1.EventsController],
        providers: [
            events_service_1.EventsService,
            ...event_providers_1.eventProviders,
            companies_service_1.CompanyService,
            ...company_providers_1.companyProviders,
            user_service_1.UserService,
            ...user_providers_1.userProviders,
            send_event_email_notification_listeners_1.SendEventEmailNotification,
            mailtrap_provider_1.MailtrapProvider,
            send_event_notification_sockets_listeners_1.SendEventNotificationSocketsListeners
        ],
    })
], EventsModule);
exports.EventsModule = EventsModule;
//# sourceMappingURL=events.module.js.map