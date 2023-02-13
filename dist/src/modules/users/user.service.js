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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const companies_service_1 = require("../companies/companies.service");
let UserService = class UserService {
    constructor(userRepository, companyService) {
        this.userRepository = userRepository;
        this.companyService = companyService;
    }
    async update(user, updatedUser) {
        return this.userRepository.update({ id: user === null || user === void 0 ? void 0 : user.id }, Object.assign({}, updatedUser));
    }
    async editCompanyProfile(user, updatedUser) {
        await this.userRepository.update({ id: user === null || user === void 0 ? void 0 : user.id }, { name: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.name, email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email });
        await this.companyService.update(user, { title: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.title });
    }
    async follow(userId, companyId) {
        const company = await this.companyService.findCompanyById(companyId);
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['following'],
        });
        const isFollowedCompany = !!user.following.find((company) => company.id == companyId);
        if (!isFollowedCompany) {
            user.following.push(company);
            company.numberOfFollowers = company.numberOfFollowers + 1;
        }
        else {
            user.following = user.following.filter((company) => {
                return company.id !== companyId;
            });
            company.numberOfFollowers = company.numberOfFollowers - 1;
        }
        await this.companyService.saveCompany(company);
        await this.userRepository.save(user);
        return isFollowedCompany;
    }
    async getFollowing(userId) {
        const user = await this.userRepository.findOne({
            where: { id: userId },
            relations: ['following'],
        });
        return user;
    }
    async getUser(userId) {
        return this.userRepository.findOne({
            where: { id: userId },
        });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        companies_service_1.CompanyService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map