import { ConfigService } from "@nestjs/config";
import { EmailMessage } from "../modules/events/types";
export declare class MailtrapProvider {
    private readonly configService;
    constructor(configService: ConfigService);
    send(message: EmailMessage): Promise<void>;
}
