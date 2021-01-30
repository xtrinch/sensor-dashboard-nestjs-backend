import { MigrationInterface, QueryRunner } from 'typeorm';

export class CategorySequenceNo1612031135726 implements MigrationInterface {
  name = 'CategorySequenceNo1612031135726';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" ADD "sequenceNo" integer NOT NULL DEFAULT '0'`,
    );

    await queryRunner.query(`
      update category c
      set "sequenceNo" = c2.seqnum - 1
      from (
        select c2.*, row_number() over () as seqnum
        from category c2
      ) c2
      where c2.id = c.id;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "sequenceNo"`);
  }
}
