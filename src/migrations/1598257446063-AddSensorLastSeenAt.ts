import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSensorLastSeenAt1598257446063 implements MigrationInterface {
  name = 'AddSensorLastSeenAt1598257446063';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor" ADD "lastSeenAt" TIMESTAMP WITH TIME ZONE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "sensor" DROP COLUMN "lastSeenAt"`);
  }
}
