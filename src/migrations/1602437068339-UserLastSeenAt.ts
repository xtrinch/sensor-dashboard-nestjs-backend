import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserLastSeenAt1602437068339 implements MigrationInterface {
  name = 'UserLastSeenAt1602437068339';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastSeenAt" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastSeenAt"`);
  }
}
