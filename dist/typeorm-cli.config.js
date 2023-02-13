"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./src/modules/users/entities/users.entity");
const companies_entity_1 = require("./src/modules/companies/entities/companies.entity");
const events_entity_1 = require("./src/modules/events/entities/events.entity");
const _1676144480467_DatabaseSchema_1 = require("./src/migrations/1676144480467-DatabaseSchema");
const _1676146633574_AddNumberOfFollowers_1 = require("./src/migrations/1676146633574-AddNumberOfFollowers");
const _1676147545380_AddNumberOfRsvp_1 = require("./src/migrations/1676147545380-AddNumberOfRsvp");
const feedback_entity_1 = require("./src/modules/feedback/entities/feedback.entity");
const _1676155916449_Feedback_1 = require("./src/migrations/1676155916449-Feedback");
const dotenv = require("dotenv");
const _1676164665452_EmailUnique_1 = require("./src/migrations/1676164665452-EmailUnique");
dotenv.config({ path: '.env' });
exports.default = new typeorm_1.DataSource({
    type: 'postgres',
    url: (_a = process.env.PG_URL) !== null && _a !== void 0 ? _a : 'postgres://postgres:changeme@127.0.0.1/event-management-system',
    entities: [users_entity_1.default, companies_entity_1.Company, events_entity_1.default, feedback_entity_1.Feedback],
    migrations: [_1676144480467_DatabaseSchema_1.DatabaseSchema1676144480467, _1676146633574_AddNumberOfFollowers_1.AddNumberOfFollowers1676146633574, _1676147545380_AddNumberOfRsvp_1.AddNumberOfRsvp1676147545380, _1676155916449_Feedback_1.Feedback1676155916449, _1676164665452_EmailUnique_1.EmailUnique1676164665452],
});
//# sourceMappingURL=typeorm-cli.config.js.map