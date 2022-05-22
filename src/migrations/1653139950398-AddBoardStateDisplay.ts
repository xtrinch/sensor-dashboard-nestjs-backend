import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBoardStateDisplay1653139950398 implements MigrationInterface {
  name = 'AddBoardStateDisplay1653139950398';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "display" ADD "state" jsonb NOT NULL DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "display" DROP COLUMN "state"`);
  }
}
