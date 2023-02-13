"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('database', () => {
    var _a;
    return {
        url: (_a = process.env.PG_URL) !== null && _a !== void 0 ? _a : `postgres://postgres:changeme@127.0.0.1/event-management-system`,
        synchronize: false,
        migrationsTableName: `schema_migrations`,
        type: 'postgres',
        logging: true,
        entities: [__dirname + '/../modules/**/entities/*.entity{.ts,.js}'],
        migrationsRun: false,
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
    };
});
//# sourceMappingURL=database.config.js.map