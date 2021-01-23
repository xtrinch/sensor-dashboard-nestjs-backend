import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserGroup1610887798980 implements MigrationInterface {
  name = 'UserGroup1610887798980';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "group" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "group"`);
  }
}
