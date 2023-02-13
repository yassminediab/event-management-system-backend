"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackProviders = void 0;
const constants_1 = require("../../constants/constants");
const feedback_entity_1 = require("./entities/feedback.entity");
exports.feedbackProviders = [
    {
        provide: 'FEEDBACK_REPOSITORY',
        useFactory: (connection) => connection.getRepository(feedback_entity_1.Feedback),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=feedback.providers.js.map