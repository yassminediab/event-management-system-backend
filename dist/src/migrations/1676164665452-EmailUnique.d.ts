import { MigrationInterface, QueryRunner } from "typeorm";
export declare class EmailUnique1676164665452 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
