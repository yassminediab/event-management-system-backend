"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformGetEventResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformGetEventResponseInterceptor = class TransformGetEventResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((response) => {
            var _a, _b;
            const event = response.data;
            return {
                message: response.message,
                data: {
                    id: event.id,
                    title: event.title,
                    location: event.location,
                    description: event.description,
                    numberofRsvp: event.numberofRsvp,
                    actualDate: event.date,
                    date: new Date(event.date).toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true,
                    }),
                    company: {
                        id: (_a = event === null || event === void 0 ? void 0 : event.company) === null || _a === void 0 ? void 0 : _a.id,
                        title: (_b = event === null || event === void 0 ? void 0 : event.company) === null || _b === void 0 ? void 0 : _b.title,
                    },
                },
            };
        }));
    }
};
TransformGetEventResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformGetEventResponseInterceptor);
exports.TransformGetEventResponseInterceptor = TransformGetEventResponseInterceptor;
//# sourceMappingURL=transform-get-event-response.interceptor.js.map