import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameAccessTokenFields1600888390919
  implements MigrationInterface {
  name = 'RenameAccessTokenFields1600888390919';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor" RENAME COLUMN "sensorAccessToken" TO "accessToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "display" RENAME COLUMN "displayAccessToken" TO "accessToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ALTER COLUMN "measurementTypes" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "display" ALTER COLUMN "measurementTypes" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "display" ALTER COLUMN "measurementTypes" SET DEFAULT ARRAY[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ALTER COLUMN "measurementTypes" SET DEFAULT ARRAY[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "display" RENAME COLUMN "accessToken" TO "displayAccessToken"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" RENAME COLUMN "accessToken" TO "sensorAccessToken"`,
    );
  }
}
