import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1732850334989 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "user" (
            id uuid NOT NULL DEFAULT uuid_generate_v4(),
            name VARCHAR(256) NOT NULL,
            active BOOL NOT NULL DEFAULT TRUE
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS "user";`)
    }

}
