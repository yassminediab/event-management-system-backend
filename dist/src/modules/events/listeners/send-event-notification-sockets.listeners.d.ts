import { EventCreatedEvent } from "../events/event-created.event";
import { CompanyService } from "../../companies/companies.service";
import { Server } from 'socket.io';
import { SocketService } from "../../sockets/socket.service";
export declare class SendEventNotificationSocketsListeners {
    private readonly companyService;
    private readonly socketService;
    constructor(companyService: CompanyService, socketService: SocketService);
    server: Server;
    handleEventCreatedEvent({ event }: EventCreatedEvent): Promise<void>;
}
