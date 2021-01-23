import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProtectedCategory1611407567212 implements MigrationInterface {
  name = 'AddProtectedCategory1611407567212';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" ADD "protected" boolean`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "protected"`);
  }
}
