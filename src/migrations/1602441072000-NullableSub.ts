import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableSub1602441072000 implements MigrationInterface {
  name = 'NullableSub1602441072000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "sub" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "sub" SET NOT NULL`,
    );
  }
}
