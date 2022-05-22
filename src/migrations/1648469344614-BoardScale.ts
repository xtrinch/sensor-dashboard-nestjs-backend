import { MigrationInterface, QueryRunner } from 'typeorm';

export class BoardScale1648469344614 implements MigrationInterface {
  name = 'BoardScale1648469344614';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "scale"`);
    await queryRunner.query(
      `ALTER TABLE "board" ADD "scale" real NOT NULL DEFAULT '1'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "scale"`);
    await queryRunner.query(
      `ALTER TABLE "board" ADD "scale" integer NOT NULL DEFAULT '1'`,
    );
  }
}
