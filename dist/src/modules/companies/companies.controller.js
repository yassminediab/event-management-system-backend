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
exports.CompanyController = void 0;
const companies_service_1 = require("./companies.service");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth-guard");
const updateCompany_dto_1 = require("./dto/updateCompany.dto");
const transform_getAllCompanies_response_interceptor_1 = require("./interceptors/transform-getAllCompanies-response.interceptor");
const bad_request_exception_1 = require("../../filters/bad-request-exception");
let CompanyController = class CompanyController {
    constructor(companyService) {
        this.companyService = companyService;
    }
    async update(req, updateCompanyDto) {
        const result = await this.companyService.update(req.user, updateCompanyDto);
        if (result.affected == 0) {
            throw new common_1.BadRequestException('You Do Not Have Company');
        }
        return {
            message: 'Company is Updated successfully',
            data: {},
        };
    }
    async getAll(req) {
        return {
            message: 'Get All Companies',
            data: await this.companyService.getAll(),
            userId: req.user.id,
        };
    }
};
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.UseFilters)(bad_request_exception_1.BadRequestExceptionFilter),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, updateCompany_dto_1.UpdateCompanyDto]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(transform_getAllCompanies_response_interceptor_1.TransformGetAllCompaniesResponseInterceptor),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getAll", null);
CompanyController = __decorate([
    (0, common_1.Controller)('companies'),
    __metadata("design:paramtypes", [companies_service_1.CompanyService])
], CompanyController);
exports.CompanyController = CompanyController;
//# sourceMappingURL=companies.controller.js.map