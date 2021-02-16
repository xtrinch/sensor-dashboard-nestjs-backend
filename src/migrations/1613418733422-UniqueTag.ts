import {MigrationInterface, QueryRunner} from "typeorm";

export class UniqueTag1613418733422 implements MigrationInterface {
    name = 'UniqueTag1613418733422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "topic"."tag" IS NULL`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "UQ_4af67c82599a4207991f183d65b" UNIQUE ("tag")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "UQ_4af67c82599a4207991f183d65b"`);
        await queryRunner.query(`COMMENT ON COLUMN "topic"."tag" IS NULL`);
    }

}
