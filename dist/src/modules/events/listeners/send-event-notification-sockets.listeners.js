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
exports.SendEventNotificationSocketsListeners = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const event_created_event_1 = require("../events/event-created.event");
const companies_service_1 = require("../../companies/companies.service");
const lodash_1 = require("lodash");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const socket_service_1 = require("../../sockets/socket.service");
let SendEventNotificationSocketsListeners = class SendEventNotificationSocketsListeners {
    constructor(companyService, socketService) {
        this.companyService = companyService;
        this.socketService = socketService;
    }
    async handleEventCreatedEvent({ event }) {
        const company = await this.companyService.findCompanyById(event.companyId);
        const userIds = (0, lodash_1.map)(company.followers, 'id');
        for (const userId of userIds) {
            await this.socketService.server.emit(`event_created_${userId}`, {
                message: `New event created from ${company.title}`,
            });
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SendEventNotificationSocketsListeners.prototype, "server", void 0);
__decorate([
    (0, event_emitter_1.OnEvent)('event.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [event_created_event_1.EventCreatedEvent]),
    __metadata("design:returntype", Promise)
], SendEventNotificationSocketsListeners.prototype, "handleEventCreatedEvent", null);
SendEventNotificationSocketsListeners = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [companies_service_1.CompanyService,
        socket_service_1.SocketService])
], SendEventNotificationSocketsListeners);
exports.SendEventNotificationSocketsListeners = SendEventNotificationSocketsListeners;
//# sourceMappingURL=send-event-notification-sockets.listeners.js.map