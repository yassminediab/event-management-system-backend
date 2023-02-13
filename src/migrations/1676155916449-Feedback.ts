import { MigrationInterface, QueryRunner } from 'typeorm';

export class Feedback1676155916449 implements MigrationInterface {
  name = 'Feedback1676155916449';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "feedback" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "feedback" character varying NOT NULL, "eventId" uuid NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "feedback" ADD CONSTRAINT "FK_4bc0741bd5753569557a142a112" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "feedback" ADD CONSTRAINT "FK_4a39e6ac0cecdf18307a365cf3c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "feedback" DROP CONSTRAINT "FK_4a39e6ac0cecdf18307a365cf3c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "feedback" DROP CONSTRAINT "FK_4bc0741bd5753569557a142a112"`,
    );
    await queryRunner.query(`DROP TABLE "feedback"`);
  }
}
