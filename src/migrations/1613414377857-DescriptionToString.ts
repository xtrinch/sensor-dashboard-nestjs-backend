import { MigrationInterface, QueryRunner } from "typeorm";

export class DescriptionToString1613414377857 implements MigrationInterface {
    name = 'DescriptionToString1613414377857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "description" TYPE VARCHAR`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "description" TYPE VARCHAR`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "description" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "description" jsonb NOT NULL`);
    }

}
