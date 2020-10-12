import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableImageUrl1602441114867 implements MigrationInterface {
  name = 'NullableImageUrl1602441114867';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "imageUrl" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "imageUrl" SET NOT NULL`,
    );
  }
}
