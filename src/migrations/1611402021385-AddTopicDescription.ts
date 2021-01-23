import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTopicDescription1611402021385 implements MigrationInterface {
  name = 'AddTopicDescription1611402021385';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "topic" ADD "description" jsonb NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "description"`);
  }
}
