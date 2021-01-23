import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddTopicTag1611414720465 implements MigrationInterface {
  name = 'AddTopicTag1611414720465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "topic" ADD "tag" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "tag"`);
  }
}
