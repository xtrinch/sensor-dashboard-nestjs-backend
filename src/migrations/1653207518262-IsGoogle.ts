import { MigrationInterface, QueryRunner } from 'typeorm';

export class IsGoogle1653207518262 implements MigrationInterface {
  name = 'IsGoogle1653207518262';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isGoogle" boolean NOT NULL DEFAULT false`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isGoogle"`);
  }
}
