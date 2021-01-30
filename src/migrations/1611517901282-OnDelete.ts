import { MigrationInterface, QueryRunner } from 'typeorm';

export class OnDelete1611517901282 implements MigrationInterface {
  name = 'OnDelete1611517901282';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "topic" DROP CONSTRAINT "FK_1ac9851d7efd0de4f3a171bbcff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_770b58eacf7b21f92db7b3f0803"`,
    );
    await queryRunner.query(
      `ALTER TABLE "topic" ADD CONSTRAINT "FK_1ac9851d7efd0de4f3a171bbcff" FOREIGN KEY ("lastCommentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_770b58eacf7b21f92db7b3f0803" FOREIGN KEY ("lastCommentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_770b58eacf7b21f92db7b3f0803"`,
    );
    await queryRunner.query(
      `ALTER TABLE "topic" DROP CONSTRAINT "FK_1ac9851d7efd0de4f3a171bbcff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_770b58eacf7b21f92db7b3f0803" FOREIGN KEY ("lastCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "topic" ADD CONSTRAINT "FK_1ac9851d7efd0de4f3a171bbcff" FOREIGN KEY ("lastCommentId") REFERENCES "comment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
