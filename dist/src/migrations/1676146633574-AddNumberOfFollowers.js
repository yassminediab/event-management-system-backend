"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddNumberOfFollowers1676146633574 = void 0;
class AddNumberOfFollowers1676146633574 {
    constructor() {
        this.name = 'AddNumberOfFollowers1676146633574';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "company" ADD "numberOfFollowers" integer NOT NULL DEFAULT '0'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "numberOfFollowers"`);
    }
}
exports.AddNumberOfFollowers1676146633574 = AddNumberOfFollowers1676146633574;
//# sourceMappingURL=1676146633574-AddNumberOfFollowers.js.map