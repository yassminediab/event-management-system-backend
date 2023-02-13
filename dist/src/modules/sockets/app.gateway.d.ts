import { OnGatewayInit } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketService } from './socket.service';
export declare class AppGateway implements OnGatewayInit {
    private socketService;
    constructor(socketService: SocketService);
    server: Server;
    afterInit(server: Server): void;
}
