"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const users_controller_1 = require("./users.controller");
const user_service_1 = require("./user.service");
const database_module_1 = require("../../database/database.module");
const user_providers_1 = require("./user.providers");
const companies_service_1 = require("../companies/companies.service");
const company_providers_1 = require("../companies/company.providers");
let UsersModule = class UsersModule {
};
UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [users_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            ...user_providers_1.userProviders,
            companies_service_1.CompanyService,
            ...company_providers_1.companyProviders,
        ],
    })
], UsersModule);
exports.UsersModule = UsersModule;
//# sourceMappingURL=users.module.js.map