import { Injectable} from '@nestjs/common';
import { OnEvent} from '@nestjs/event-emitter';
import {EventCreatedEvent} from "../events/event-created.event";
import {CompanyService} from "../../companies/companies.service";
import Company from "../../companies/entities/companies.entity";
import {map} from "lodash";
import {MailtrapProvider} from "../../../mail-providers/mailtrap.provider";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class SendEventEmailNotification {
    constructor(
        private readonly companyService: CompanyService,
        private readonly mailtrapProvider: MailtrapProvider,
        private readonly configService: ConfigService,
    ) {}

    @OnEvent('event.created')
    async handleEventCreatedEvent({event}: EventCreatedEvent) {
        const company: Company = await this.companyService.findCompanyById(event.companyId);
        const emails: string[] = map(company.followers,'email');
        for (const email of emails) {
            await this.mailtrapProvider.send({
                from: this.configService.get('mailTrap.from'),
                to: email,
                subject: `New event created from ${company.title}`,
                text: `There is new coming event '${event.title} in ${event.location} at ${event.date} which you might be interested on it'`
            })
        }
    }
}
