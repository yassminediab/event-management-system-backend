import { Injectable} from '@nestjs/common';
import { OnEvent} from '@nestjs/event-emitter';
import {EventCreatedEvent} from "../events/event-created.event";
import {CompanyService} from "../../companies/companies.service";
import Company from "../../companies/entities/companies.entity";
import {map} from "lodash";
import {WebSocketServer} from "@nestjs/websockets";
import { Server } from 'socket.io';
import {SocketService} from "../../sockets/socket.service";

@Injectable()
export class SendEventNotificationSocketsListeners {
    constructor(
        private readonly companyService: CompanyService,
        private readonly socketService: SocketService,
    ) {}

    @WebSocketServer()
    server: Server;

    @OnEvent('event.created')
    async handleEventCreatedEvent({event}: EventCreatedEvent) {
        const company: Company = await this.companyService.findCompanyById(event.companyId);
        const userIds: string[] = map(company.followers,'id');
        for (const userId of userIds) {
            await this.socketService.server.emit(`event_created_${userId}`, {
                message: `New event created from ${company.title}`,
            });
        }
    }
}
