import {Injectable} from "@nestjs/common";
import {createTransport} from 'nodemailer'
import {ConfigService} from "@nestjs/config";
import {EmailMessage} from "../modules/events/types";

@Injectable()
export class MailtrapProvider {

    constructor(
        private readonly configService: ConfigService,
    ) {}

    async send(message: EmailMessage){
        const transport = createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: this.configService.get('mailTrap.user'),
                pass: this.configService.get('mailTrap.pass')
            }
        });

        await transport.sendMail(message, (err, info) => {
            if (err) {
                console.log(err)
            } else {
                console.log(info);
            }
        });

    }
}
