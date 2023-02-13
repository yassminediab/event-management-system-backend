"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNumberOfRsvp1676147545380 = void 0;
class AddNumberOfRsvp1676147545380 {
    constructor() {
        this.name = 'AddNumberOfRsvp1676147545380';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event" ADD "numberOfRsvp" integer NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "numberOfRsvp"`);
    }
}
exports.AddNumberOfRsvp1676147545380 = AddNumberOfRsvp1676147545380;
//# sourceMappingURL=1676147545380-AddNumberOfRsvp.js.map