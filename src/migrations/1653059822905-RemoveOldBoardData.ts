import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveOldBoardData1653059822905 implements MigrationInterface {
    name = 'RemoveOldBoardData1653059822905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "boardX"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "boardY"`);
        await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "scale"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "board" ADD "scale" real NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "board" ADD "boardY" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "board" ADD "boardX" integer NOT NULL DEFAULT '0'`);
    }

}
