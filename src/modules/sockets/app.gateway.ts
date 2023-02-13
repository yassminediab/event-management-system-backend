import { WebSocketGateway, OnGatewayInit, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketService } from './socket.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayInit {
    constructor(private socketService: SocketService){

    }
    @WebSocketServer()
    server: Server;

    afterInit(server: Server) {
        this.socketService.server = server;
    }
}
