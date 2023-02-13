"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventProviders = void 0;
const constants_1 = require("../../constants/constants");
const events_entity_1 = require("./entities/events.entity");
exports.eventProviders = [
    {
        provide: 'EVENT_REPOSITORY',
        useFactory: (connection) => connection.getRepository(events_entity_1.default),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=event.providers.js.map