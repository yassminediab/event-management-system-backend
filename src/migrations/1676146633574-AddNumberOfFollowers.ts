import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNumberOfFollowers1676146633574 implements MigrationInterface {
  name = 'AddNumberOfFollowers1676146633574';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" ADD "numberOfFollowers" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "company" DROP COLUMN "numberOfFollowers"`,
    );
  }
}
