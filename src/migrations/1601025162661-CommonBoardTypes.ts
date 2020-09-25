import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommonBoardTypes1601025162661 implements MigrationInterface {
  name = 'CommonBoardTypes1601025162661';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "forwarder" ADD "boardType" character varying NOT NULL DEFAULT 'OTHER'`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ADD "sensorTypes" text array NOT NULL DEFAULT ARRAY[]::text[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "display" ADD "displayType" character varying NOT NULL DEFAULT 'OTHER'`,
    );

    await queryRunner.query(
      `ALTER TABLE "forwarder" ALTER COLUMN "boardType" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ALTER COLUMN "sensorTypes" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "display" ALTER COLUMN "displayType" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "display" DROP COLUMN "displayType"`);
    await queryRunner.query(`ALTER TABLE "sensor" DROP COLUMN "sensorTypes"`);
    await queryRunner.query(`ALTER TABLE "forwarder" DROP COLUMN "boardType"`);
  }
}
