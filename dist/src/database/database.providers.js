"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants/constants");
const config_1 = require("@nestjs/config");
exports.databaseProviders = [
    {
        provide: constants_1.DATABASE_CONNECTION,
        useFactory: async (configService) => await (0, typeorm_1.createConnection)(configService.get('database')),
        inject: [config_1.ConfigService],
    },
];
//# sourceMappingURL=database.providers.js.map