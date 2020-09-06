import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDisplayNameToSensor1599377850375 implements MigrationInterface {
    name = 'AddDisplayNameToSensor1599377850375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE "sensor" ADD "displayName" character varying NOT NULL DEFAULT 'NoName'`
        );
        await queryRunner.query(
          `ALTER TABLE "sensor" ALTER COLUMN "displayName" DROP DEFAULT`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sensor" DROP COLUMN "displayName"`);
    }

}
