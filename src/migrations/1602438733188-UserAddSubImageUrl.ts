import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAddSubImageUrl1602438733188 implements MigrationInterface {
  name = 'UserAddSubImageUrl1602438733188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "sub" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "imageUrl" character varying NOT NULL DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "sub" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "imageUrl" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "imageUrl"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "sub"`);
  }
}
