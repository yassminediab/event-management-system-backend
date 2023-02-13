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
exports.MailtrapProvider = void 0;
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
const config_1 = require("@nestjs/config");
let MailtrapProvider = class MailtrapProvider {
    constructor(configService) {
        this.configService = configService;
    }
    async send(message) {
        const transport = (0, nodemailer_1.createTransport)({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: this.configService.get('mailTrap.user'),
                pass: this.configService.get('mailTrap.pass')
            }
        });
        await transport.sendMail(message, (err, info) => {
            if (err) {
                console.log(err);
            }
            else {
                console.log(info);
            }
        });
    }
};
MailtrapProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailtrapProvider);
exports.MailtrapProvider = MailtrapProvider;
//# sourceMappingURL=mailtrap.provider.js.map