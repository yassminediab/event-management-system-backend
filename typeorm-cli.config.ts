import {DataSource} from "typeorm";
import User from "./src/modules/users/entities/users.entity";
import {Company} from "./src/modules/companies/entities/companies.entity";
import EventsEntity from "./src/modules/events/entities/events.entity";
import {DatabaseSchema1676144480467} from "./src/migrations/1676144480467-DatabaseSchema";
import {AddNumberOfFollowers1676146633574} from "./src/migrations/1676146633574-AddNumberOfFollowers";
import {AddNumberOfRsvp1676147545380} from "./src/migrations/1676147545380-AddNumberOfRsvp";
import {Feedback} from "./src/modules/feedback/entities/feedback.entity";
import {Feedback1676155916449} from "./src/migrations/1676155916449-Feedback";
import * as dotenv from 'dotenv'
import {EmailUnique1676164665452} from "./src/migrations/1676164665452-EmailUnique";

dotenv.config({ path: '.env' });

export default new DataSource({
    type: 'postgres',
    url: process.env.PG_URL ?? 'postgres://postgres:changeme@127.0.0.1/event-management-system',
    entities: [User, Company, EventsEntity, Feedback],
    migrations: [DatabaseSchema1676144480467, AddNumberOfFollowers1676146633574, AddNumberOfRsvp1676147545380, Feedback1676155916449, EmailUnique1676164665452],
});
