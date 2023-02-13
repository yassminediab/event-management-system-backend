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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth-guard");
const transform_register_response_interceptor_1 = require("../auth/interceptors/transform-register-response.interceptor");
const editProfile_dto_1 = require("./dto/editProfile.dto");
const bad_request_exception_1 = require("../../filters/bad-request-exception");
const editCompanyProfile_dto_1 = require("./dto/editCompanyProfile.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getProfile(req) {
        var _a;
        const user = await this.userService.getUser((_a = req.user) === null || _a === void 0 ? void 0 : _a.id);
        return {
            message: 'Get profile',
            data: user,
        };
    }
    async editProfile(req, editProfileDto) {
        await this.userService.update(req.user, editProfileDto);
        return {
            message: 'Profile is updated successfully',
            data: {},
        };
    }
    async editCompanyProfile(req, editProfileDto) {
        await this.userService.editCompanyProfile(req.user, editProfileDto);
        return {
            message: 'Company Profile is updated successfully',
            data: {},
        };
    }
    async followCompany(req, id) {
        const followed = await this.userService.follow(req.user.id, id);
        return {
            message: `You ${followed ? 'unfollowed' : 'followed'} company successfully`,
            data: {},
        };
    }
    async getFollowingCompanies(req) {
        const user = await this.userService.getFollowing(req.user.id);
        return {
            message: ``,
            data: user.following,
        };
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    (0, common_1.UseInterceptors)(transform_register_response_interceptor_1.TransformRegisterResponseInterceptor),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('profile'),
    (0, common_1.UseInterceptors)(transform_register_response_interceptor_1.TransformRegisterResponseInterceptor),
    (0, common_1.UseFilters)(bad_request_exception_1.BadRequestExceptionFilter),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, editProfile_dto_1.EditUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('company/profile'),
    (0, common_1.UseInterceptors)(transform_register_response_interceptor_1.TransformRegisterResponseInterceptor),
    (0, common_1.UseFilters)(bad_request_exception_1.BadRequestExceptionFilter),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, editCompanyProfile_dto_1.EditCompanyProfileDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "editCompanyProfile", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('companies/:id/follow'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "followCompany", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('following'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getFollowingCompanies", null);
UserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=users.controller.js.map