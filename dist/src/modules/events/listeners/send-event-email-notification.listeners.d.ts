import { EventCreatedEvent } from "../events/event-created.event";
import { CompanyService } from "../../companies/companies.service";
import { MailtrapProvider } from "../../../mail-providers/mailtrap.provider";
import { ConfigService } from "@nestjs/config";
export declare class SendEventEmailNotification {
    private readonly companyService;
    private readonly mailtrapProvider;
    private readonly configService;
    constructor(companyService: CompanyService, mailtrapProvider: MailtrapProvider, configService: ConfigService);
    handleEventCreatedEvent({ event }: EventCreatedEvent): Promise<void>;
}
