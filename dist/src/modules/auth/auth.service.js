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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, companyRepository) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.companyRepository = companyRepository;
    }
    async register(registerUserDto) {
        const hash = await bcrypt.hash(registerUserDto.password, 12);
        return this.userRepository.save(Object.assign(Object.assign({}, registerUserDto), { password: hash }));
    }
    async registerAsCompany(registerUserDto) {
        const hash = await bcrypt.hash(registerUserDto.password, 12);
        const user = await this.userRepository.save(Object.assign(Object.assign({}, registerUserDto), { password: hash }));
        await this.companyRepository.save({
            title: registerUserDto === null || registerUserDto === void 0 ? void 0 : registerUserDto.companyTitle,
            userId: user === null || user === void 0 ? void 0 : user.id
        });
        return user;
    }
    async login(loginUserDto) {
        const user = await this.userRepository.findOne({
            where: { email: loginUserDto.email }, relations: ['company']
        });
        if (user && (await bcrypt.compare(loginUserDto.password, user.password))) {
            const jwt = await this.jwtService.signAsync(Object.assign({}, user), { secret: 'jwtSecret' });
            return { user: user, token: jwt };
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('USER_REPOSITORY')),
    __param(2, (0, common_1.Inject)('COMPANY_REPOSITORY')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService,
        typeorm_1.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map