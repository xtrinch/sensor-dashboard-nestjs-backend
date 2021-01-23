import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategoryDescription1610987553542 implements MigrationInterface {
  name = 'CategoryDescription1610987553542';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" ADD "description" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "description"`);
  }
}
