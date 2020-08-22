import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserNameSurname1598121165278 implements MigrationInterface {
  name = 'UserNameSurname1598121165278';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "name" character varying NOT NULL DEFAULT 'mojca'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "surname" character varying NOT NULL DEFAULT 'rojca'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "surname" DROP DEFAULT`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "surname"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
  }
}
