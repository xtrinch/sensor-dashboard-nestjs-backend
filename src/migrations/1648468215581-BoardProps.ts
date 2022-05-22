import { MigrationInterface, QueryRunner } from 'typeorm';

export class BoardProps1648468215581 implements MigrationInterface {
  name = 'BoardProps1648468215581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "board" ADD "scale" integer NOT NULL DEFAULT '1'`,
    );
    await queryRunner.query(
      `ALTER TABLE "board" ADD "boardX" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "board" ADD "boardY" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "boardY"`);
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "boardX"`);
    await queryRunner.query(`ALTER TABLE "board" DROP COLUMN "scale"`);
  }
}
