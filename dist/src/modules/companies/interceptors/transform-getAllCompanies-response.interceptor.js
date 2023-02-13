"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformGetAllCompaniesResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformGetAllCompaniesResponseInterceptor = class TransformGetAllCompaniesResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((response) => {
            return {
                message: response.message,
                data: response.data.map((company) => {
                    var _a, _b, _c, _d;
                    return {
                        id: company.id,
                        title: company.title,
                        numberOfFollowers: company.numberOfFollowers,
                        isFollowed: !!((_a = company.followers) === null || _a === void 0 ? void 0 : _a.find((user) => response.userId == (user === null || user === void 0 ? void 0 : user.id))),
                        user: {
                            id: (_b = company === null || company === void 0 ? void 0 : company.user) === null || _b === void 0 ? void 0 : _b.id,
                            name: (_c = company === null || company === void 0 ? void 0 : company.user) === null || _c === void 0 ? void 0 : _c.name,
                            email: (_d = company === null || company === void 0 ? void 0 : company.user) === null || _d === void 0 ? void 0 : _d.email,
                        },
                    };
                }),
            };
        }));
    }
};
TransformGetAllCompaniesResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformGetAllCompaniesResponseInterceptor);
exports.TransformGetAllCompaniesResponseInterceptor = TransformGetAllCompaniesResponseInterceptor;
//# sourceMappingURL=transform-getAllCompanies-response.interceptor.js.map