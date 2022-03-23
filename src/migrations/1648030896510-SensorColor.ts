import { MigrationInterface, QueryRunner } from 'typeorm';

export class SensorColor1648030896510 implements MigrationInterface {
  name = 'SensorColor1648030896510';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor" ADD "color" character varying(7) NOT NULL DEFAULT '#ffffff'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sensor" DROP COLUMN "color"`);
  }
}
