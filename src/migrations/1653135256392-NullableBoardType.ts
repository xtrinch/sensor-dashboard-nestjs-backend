import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableBoardType1653135256392 implements MigrationInterface {
  name = 'NullableBoardType1653135256392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor" ALTER COLUMN "boardType" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "display" ALTER COLUMN "boardType" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "forwarder" ALTER COLUMN "boardType" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "radio" ALTER COLUMN "boardType" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "radio" ALTER COLUMN "boardType" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "forwarder" ALTER COLUMN "boardType" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "display" ALTER COLUMN "boardType" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ALTER COLUMN "boardType" SET NOT NULL`,
    );
  }
}
