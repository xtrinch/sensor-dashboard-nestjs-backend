import { MigrationInterface, QueryRunner } from 'typeorm';

export class MeasurementToFloat41608999915447 implements MigrationInterface {
  name = 'MeasurementToFloat41608999915447';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurement" ALTER COLUMN measurement TYPE real`,
    );
    // await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "measurement"`);
    // await queryRunner.query(`ALTER TABLE "measurement" ADD "measurement" real NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurement" DROP COLUMN "measurement"`,
    );
    await queryRunner.query(
      `ALTER TABLE "measurement" ADD "measurement" double precision NOT NULL`,
    );
  }
}
