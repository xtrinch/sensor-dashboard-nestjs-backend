import { MigrationInterface, QueryRunner } from 'typeorm';

export class Cleanup1653134549147 implements MigrationInterface {
  name = 'Cleanup1653134549147';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sensor" DROP COLUMN "testSquash"`);
    await queryRunner.query(
      `ALTER TABLE "sensor" ALTER COLUMN "measurementTypes" SET DEFAULT '{}'`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ALTER COLUMN "sensorTypes" SET DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor" ALTER COLUMN "sensorTypes" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ALTER COLUMN "measurementTypes" DROP DEFAULT`,
    );
    await queryRunner.query(`ALTER TABLE "sensor" ADD "testSquash" text`);
  }
}
