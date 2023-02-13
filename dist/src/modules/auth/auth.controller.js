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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const registerUser_dto_1 = require("./dto/registerUser.dto");
const transform_register_response_interceptor_1 = require("./interceptors/transform-register-response.interceptor");
const loginUser_dto_1 = require("./dto/loginUser.dto");
const transform_login_response_interceptor_1 = require("./interceptors/transform-login-response.interceptor");
const unauthorized_exception_1 = require("../../filters/unauthorized-exception");
const registerCompany_dto_1 = require("./dto/registerCompany.dto");
const bad_request_exception_1 = require("../../filters/bad-request-exception");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerUserDto) {
        return {
            message: 'User is created successfully',
            data: await this.authService.register(registerUserDto),
        };
    }
    async registerAsCompany(registerUserDto) {
        return {
            message: 'User is created successfully',
            data: await this.authService.registerAsCompany(registerUserDto),
        };
    }
    async login(loginUserDto) {
        const res = await this.authService.login(loginUserDto);
        if (res) {
            return {
                message: '',
                data: res,
            };
        }
        throw new common_1.UnauthorizedException('Invalid email or password');
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UseInterceptors)(transform_register_response_interceptor_1.TransformRegisterResponseInterceptor),
    (0, common_1.UseFilters)(bad_request_exception_1.BadRequestExceptionFilter),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerUser_dto_1.RegisterUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('register/company'),
    (0, common_1.UseInterceptors)(transform_register_response_interceptor_1.TransformRegisterResponseInterceptor),
    (0, common_1.UseFilters)(bad_request_exception_1.BadRequestExceptionFilter),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [registerCompany_dto_1.RegisterCompanyDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerAsCompany", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UseInterceptors)(transform_login_response_interceptor_1.TransformLoginResponseInterceptor),
    (0, common_1.UseFilters)(unauthorized_exception_1.NotAuthorizedExceptionFilter),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [loginUser_dto_1.LoginUserDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map