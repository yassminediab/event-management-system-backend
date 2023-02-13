"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseSchema1676144480467 = void 0;
class DatabaseSchema1676144480467 {
    constructor() {
        this.name = 'DatabaseSchema1676144480467';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "event" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "location" character varying NOT NULL, "description" character varying NOT NULL, "companyId" uuid NOT NULL, "date" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "numberOfAttendance" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "REL_c41a1d36702f2cd0403ce58d33" UNIQUE ("userId"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "rsvp" ("userId" uuid NOT NULL, "eventId" uuid NOT NULL, CONSTRAINT "PK_5cd7549c509afe38fcbc11f0a8f" PRIMARY KEY ("userId", "eventId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fad6e1f3d4128ef9df5ab69d8a" ON "rsvp" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_14d4f4054ecf49c45bd4fb4936" ON "rsvp" ("eventId") `);
        await queryRunner.query(`CREATE TABLE "attendance" ("userId" uuid NOT NULL, "eventId" uuid NOT NULL, CONSTRAINT "PK_7ff3cf6104d74999e6ee981c342" PRIMARY KEY ("userId", "eventId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_466e85b813d871bfb693f44352" ON "attendance" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f89c5a18dbf866ba8b1e4a9b8e" ON "attendance" ("eventId") `);
        await queryRunner.query(`CREATE TABLE "company_followers" ("userId" uuid NOT NULL, "companyId" uuid NOT NULL, CONSTRAINT "PK_c0f4cc1a0c54d3b36183e142db0" PRIMARY KEY ("userId", "companyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0aaecba185141e80cb8b4dcd98" ON "company_followers" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0ed856013c5339acaf02647148" ON "company_followers" ("companyId") `);
        await queryRunner.query(`ALTER TABLE "event" ADD CONSTRAINT "FK_62d4aa390c2a2a7856d358ce72f" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company" ADD CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "rsvp" ADD CONSTRAINT "FK_fad6e1f3d4128ef9df5ab69d8a7" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "rsvp" ADD CONSTRAINT "FK_14d4f4054ecf49c45bd4fb49366" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_466e85b813d871bfb693f443528" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "attendance" ADD CONSTRAINT "FK_f89c5a18dbf866ba8b1e4a9b8e9" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "company_followers" ADD CONSTRAINT "FK_0aaecba185141e80cb8b4dcd985" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "company_followers" ADD CONSTRAINT "FK_0ed856013c5339acaf026471487" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "company_followers" DROP CONSTRAINT "FK_0ed856013c5339acaf026471487"`);
        await queryRunner.query(`ALTER TABLE "company_followers" DROP CONSTRAINT "FK_0aaecba185141e80cb8b4dcd985"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_f89c5a18dbf866ba8b1e4a9b8e9"`);
        await queryRunner.query(`ALTER TABLE "attendance" DROP CONSTRAINT "FK_466e85b813d871bfb693f443528"`);
        await queryRunner.query(`ALTER TABLE "rsvp" DROP CONSTRAINT "FK_14d4f4054ecf49c45bd4fb49366"`);
        await queryRunner.query(`ALTER TABLE "rsvp" DROP CONSTRAINT "FK_fad6e1f3d4128ef9df5ab69d8a7"`);
        await queryRunner.query(`ALTER TABLE "company" DROP CONSTRAINT "FK_c41a1d36702f2cd0403ce58d33a"`);
        await queryRunner.query(`ALTER TABLE "event" DROP CONSTRAINT "FK_62d4aa390c2a2a7856d358ce72f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0ed856013c5339acaf02647148"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0aaecba185141e80cb8b4dcd98"`);
        await queryRunner.query(`DROP TABLE "company_followers"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f89c5a18dbf866ba8b1e4a9b8e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_466e85b813d871bfb693f44352"`);
        await queryRunner.query(`DROP TABLE "attendance"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_14d4f4054ecf49c45bd4fb4936"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fad6e1f3d4128ef9df5ab69d8a"`);
        await queryRunner.query(`DROP TABLE "rsvp"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "event"`);
    }
}
exports.DatabaseSchema1676144480467 = DatabaseSchema1676144480467;
//# sourceMappingURL=1676144480467-DatabaseSchema.js.map