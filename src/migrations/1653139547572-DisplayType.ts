import { MigrationInterface, QueryRunner } from 'typeorm';

export class DisplayType1653139547572 implements MigrationInterface {
  name = 'DisplayType1653139547572';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "display" ADD "type" character varying NOT NULL DEFAULT 'custom'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "display" DROP COLUMN "type"`);
  }
}
