"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companiesModule = void 0;
const common_1 = require("@nestjs/common");
const companies_controller_1 = require("./companies.controller");
const companies_service_1 = require("./companies.service");
const company_providers_1 = require("./company.providers");
const database_module_1 = require("../../database/database.module");
let companiesModule = class companiesModule {
};
companiesModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [companies_controller_1.CompanyController],
        providers: [companies_service_1.CompanyService, ...company_providers_1.companyProviders],
    })
], companiesModule);
exports.companiesModule = companiesModule;
//# sourceMappingURL=compaies.module.js.map