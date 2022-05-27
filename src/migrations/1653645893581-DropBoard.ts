import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropBoard1653645893581 implements MigrationInterface {
  name = 'DropBoard1653645893581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_1320cffdd7fd436b301154ae0d9"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "boardId"`);
    await queryRunner.query(`DROP TABLE "board"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "boardId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_1320cffdd7fd436b301154ae0d9" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }
}
