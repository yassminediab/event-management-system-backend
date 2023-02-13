import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class DatabaseSchema1676144480467 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
