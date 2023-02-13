"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt-strategy");
const auth_service_1 = require("./auth.service");
const user_providers_1 = require("../users/user.providers");
const database_module_1 = require("../../database/database.module");
const auth_controller_1 = require("./auth.controller");
const emailUnique_1 = require("../users/validators/emailUnique");
const companies_service_1 = require("../companies/companies.service");
const company_providers_1 = require("../companies/company.providers");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            database_module_1.DatabaseModule,
            jwt_1.JwtModule.register({
                secretOrPrivateKey: 'jwtSecret',
                signOptions: { expiresIn: '200d' },
            }),
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            jwt_strategy_1.JwtStrategy,
            auth_service_1.AuthService,
            ...user_providers_1.userProviders,
            emailUnique_1.emailUnique,
            jwt_1.JwtService,
            companies_service_1.CompanyService, ...company_providers_1.companyProviders
        ],
        exports: [],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map