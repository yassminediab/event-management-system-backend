import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddNumberOfFollowers1676146633574 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
