import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNumberOfRsvp1676147545380 implements MigrationInterface {
  name = 'AddNumberOfRsvp1676147545380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" ADD "numberOfRsvp" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "numberOfRsvp"`);
  }
}
