import {MigrationInterface, QueryRunner} from "typeorm";

export class SquashMigrationTest1608642904974 implements MigrationInterface {
    name = 'SquashMigrationTest1608642904974'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor" ADD "testSquash" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor" DROP COLUMN "testSquash"`);
    }

}
