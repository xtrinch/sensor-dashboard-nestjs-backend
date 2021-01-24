import { MigrationInterface, QueryRunner } from 'typeorm';

export class CommentUpdates1611490023020 implements MigrationInterface {
  name = 'CommentUpdates1611490023020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "categoryId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comment" ADD "name" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "categoryId"`);
  }
}
