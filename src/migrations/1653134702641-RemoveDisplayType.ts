import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDisplayType1653134702641 implements MigrationInterface {
  name = 'RemoveDisplayType1653134702641';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "display" DROP COLUMN "displayType"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "display" ADD "displayType" character varying NOT NULL`,
    );
  }
}
