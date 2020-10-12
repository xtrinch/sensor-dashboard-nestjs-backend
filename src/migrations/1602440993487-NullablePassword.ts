import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullablePassword1602440993487 implements MigrationInterface {
  name = 'NullablePassword1602440993487';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "password" DROP NOT NULL`,
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
      `ALTER TABLE "user" ALTER COLUMN "password" SET NOT NULL`,
    );
  }
}
