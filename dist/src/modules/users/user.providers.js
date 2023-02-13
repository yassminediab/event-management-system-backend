"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProviders = void 0;
const users_entity_1 = require("./entities/users.entity");
const constants_1 = require("../../constants/constants");
exports.userProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (connection) => connection.getRepository(users_entity_1.default),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=user.providers.js.map