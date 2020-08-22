import { MigrationInterface, QueryRunner } from 'typeorm';

export class SensorId1596724208583 implements MigrationInterface {
  name = 'SensorId1596724208583';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurement" DROP CONSTRAINT "FK_15c864ea53c5f14b3db6104268e"`,
    );
    await queryRunner.query(
      `UPDATE "measurement" SET "sensorId" = 1 WHERE "sensorId" IS NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "measurement" ALTER COLUMN "sensorId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "measurement" ALTER COLUMN "sensorId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "measurement" ADD CONSTRAINT "FK_15c864ea53c5f14b3db6104268e" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurement" DROP CONSTRAINT "FK_15c864ea53c5f14b3db6104268e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "measurement" ALTER COLUMN "sensorId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "measurement" ADD CONSTRAINT "FK_15c864ea53c5f14b3db6104268e" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
