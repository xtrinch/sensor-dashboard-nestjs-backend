import { MigrationInterface, QueryRunner } from 'typeorm';

export class NonNull1611433452398 implements MigrationInterface {
  name = 'NonNull1611433452398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" ALTER COLUMN "protected" SET NOT NULL`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "category"."protected" IS NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`COMMENT ON COLUMN "category"."protected" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "category" ALTER COLUMN "protected" DROP NOT NULL`,
    );
  }
}
