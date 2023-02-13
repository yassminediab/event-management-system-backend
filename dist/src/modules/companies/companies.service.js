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
exports.CompanyService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let CompanyService = class CompanyService {
    constructor(companyRepository) {
        this.companyRepository = companyRepository;
    }
    async update(user, company) {
        return this.companyRepository.update({ userId: user === null || user === void 0 ? void 0 : user.id }, { title: company.title });
    }
    async getAll() {
        return this.companyRepository.find({ relations: ['user', 'followers'] });
    }
    async checkIfCompanyExists(userId) {
        return this.companyRepository.findOne({ where: { userId: userId } });
    }
    async findCompanyById(id) {
        return this.companyRepository.findOne({
            where: { id },
            relations: ['followers'],
        });
    }
    async saveCompany(company) {
        return this.companyRepository.save(company);
    }
};
CompanyService = __decorate([
    __param(0, (0, common_1.Inject)('COMPANY_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CompanyService);
exports.CompanyService = CompanyService;
//# sourceMappingURL=companies.service.js.map