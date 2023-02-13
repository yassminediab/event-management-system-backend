"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appConfig = {
    name: 'event-management-system',
    port: typeof process.env.PORT == 'undefined'
        ? 3000
        : parseInt(process.env.PORT || '0'),
    jwtSecret: process.env.JWT_SECRET || 'JWT_SECRET',
    mailTrap: {
        user: process.env.MAILTRAP_USER || 'f0d280415169c0',
        pass: process.env.MAILTRAP_PASS || '0c08dadd7af24e',
        from: process.env.FROM_EMAIL || 'eventmanagementsystem@gmail.com',
    }
};
exports.default = appConfig;
//# sourceMappingURL=configuration.js.map