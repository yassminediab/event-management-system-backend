"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackModule = void 0;
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../database/database.module");
const feedback_controller_1 = require("./feedback.controller");
const feedback_service_1 = require("./feedback.service");
const feedback_providers_1 = require("./feedback.providers");
const events_service_1 = require("../events/events.service");
const event_providers_1 = require("../events/event.providers");
const companies_service_1 = require("../companies/companies.service");
const company_providers_1 = require("../companies/company.providers");
const user_service_1 = require("../users/user.service");
const user_providers_1 = require("../users/user.providers");
let FeedbackModule = class FeedbackModule {
};
FeedbackModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [feedback_controller_1.FeedbackController],
        providers: [
            feedback_service_1.FeedbackService,
            ...feedback_providers_1.feedbackProviders,
            events_service_1.EventsService,
            ...event_providers_1.eventProviders,
            companies_service_1.CompanyService,
            ...company_providers_1.companyProviders,
            user_service_1.UserService,
            ...user_providers_1.userProviders,
        ],
    })
], FeedbackModule);
exports.FeedbackModule = FeedbackModule;
//# sourceMappingURL=feedback.module.js.map