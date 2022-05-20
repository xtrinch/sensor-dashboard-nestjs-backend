import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropOldBoardData1653059480339 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        UPDATE "board" SET "state"='{}'
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
