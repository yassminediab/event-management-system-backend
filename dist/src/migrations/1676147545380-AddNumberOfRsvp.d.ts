import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class AddNumberOfRsvp1676147545380 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
