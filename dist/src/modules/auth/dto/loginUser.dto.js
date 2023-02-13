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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUserResDto = exports.LoginUserDto = void 0;
const class_validator_1 = require("class-validator");
const users_entity_1 = require("../../users/entities/users.entity");
const swagger_1 = require("@nestjs/swagger");
class LoginUserDto {
}
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
exports.LoginUserDto = LoginUserDto;
class LoginUserResDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginUserResDto.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", users_entity_1.default)
], LoginUserResDto.prototype, "user", void 0);
exports.LoginUserResDto = LoginUserResDto;
//# sourceMappingURL=loginUser.dto.js.map