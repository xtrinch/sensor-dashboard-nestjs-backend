import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNumForwarded1600968078511 implements MigrationInterface {
  name = 'AddNumForwarded1600968078511';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "forwarder" ADD "numForwarded" integer NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "forwarder" DROP COLUMN "numForwarded"`,
    );
  }
}
