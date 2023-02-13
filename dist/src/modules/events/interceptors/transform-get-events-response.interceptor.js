"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformGetEventsResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformGetEventsResponseInterceptor = class TransformGetEventsResponseInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((response) => {
            return {
                message: response.message,
                data: response.data.map((event) => {
                    var _a, _b, _c;
                    return {
                        id: event.id,
                        title: event.title,
                        location: event.location,
                        description: event.description,
                        numberOfRsvp: event.numberOfRsvp,
                        actualDate: event.date,
                        isRsvp: !!((_a = event.rsvp) === null || _a === void 0 ? void 0 : _a.find((user) => response.userId == (user === null || user === void 0 ? void 0 : user.id))),
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
                            id: (_b = event === null || event === void 0 ? void 0 : event.company) === null || _b === void 0 ? void 0 : _b.id,
                            title: (_c = event === null || event === void 0 ? void 0 : event.company) === null || _c === void 0 ? void 0 : _c.title,
                        },
                    };
                }),
            };
        }));
    }
};
TransformGetEventsResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformGetEventsResponseInterceptor);
exports.TransformGetEventsResponseInterceptor = TransformGetEventsResponseInterceptor;
//# sourceMappingURL=transform-get-events-response.interceptor.js.map