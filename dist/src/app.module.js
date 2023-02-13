"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./modules/auth/auth.module");
const configuration_1 = require("./config/configuration");
const database_config_1 = require("./database/database.config");
const compaies_module_1 = require("./modules/companies/compaies.module");
const users_module_1 = require("./modules/users/users.module");
const events_module_1 = require("./modules/events/events.module");
const feedback_module_1 = require("./modules/feedback/feedback.module");
const event_emitter_1 = require("@nestjs/event-emitter");
const socket_module_1 = require("./modules/sockets/socket.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [() => configuration_1.default, database_config_1.default],
                isGlobal: true,
            }),
            auth_module_1.AuthModule,
            compaies_module_1.companiesModule,
            users_module_1.UsersModule,
            events_module_1.EventsModule,
            feedback_module_1.FeedbackModule,
            event_emitter_1.EventEmitterModule.forRoot(),
            socket_module_1.SocketModule
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map