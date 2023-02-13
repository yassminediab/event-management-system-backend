"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformLoginResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformLoginResponseInterceptor = class TransformLoginResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((response) => {
            return {
                message: response.message,
                data: {
                    id: response.data.user.id,
                    name: response.data.user.name,
                    email: response.data.user.email,
                    token: response.data.token,
                    company: response.data.user.company
                },
            };
        }));
    }
};
TransformLoginResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformLoginResponseInterceptor);
exports.TransformLoginResponseInterceptor = TransformLoginResponseInterceptor;
//# sourceMappingURL=transform-login-response.interceptor.js.map