"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailUnique1676164665452 = void 0;
class EmailUnique1676164665452 {
    constructor() {
        this.name = 'EmailUnique1676164665452';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    }
}
exports.EmailUnique1676164665452 = EmailUnique1676164665452;
//# sourceMappingURL=1676164665452-EmailUnique.js.map