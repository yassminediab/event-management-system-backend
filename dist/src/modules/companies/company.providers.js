"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyProviders = void 0;
const constants_1 = require("../../constants/constants");
const companies_entity_1 = require("./entities/companies.entity");
exports.companyProviders = [
    {
        provide: 'COMPANY_REPOSITORY',
        useFactory: (connection) => connection.getRepository(companies_entity_1.default),
        inject: [constants_1.DATABASE_CONNECTION],
    },
];
//# sourceMappingURL=company.providers.js.map