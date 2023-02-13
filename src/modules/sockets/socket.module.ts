import { Module, Global } from '@nestjs/common';
import { SocketService } from './socket.service';
import {AppGateway} from "./app.gateway";

@Global()
@Module({
    controllers: [],
    providers: [SocketService, AppGateway],
    exports: [SocketService],
})
export class SocketModule {}
