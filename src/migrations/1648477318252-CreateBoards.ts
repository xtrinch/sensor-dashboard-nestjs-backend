import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 } from 'uuid';

export class CreateBoards1648477318252 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let userIds = await queryRunner.query(
      'SELECT id from "user" where "boardId" IS NULL',
    );
    userIds = userIds.map((i) => i.id);
    console.log(userIds);

    for (let id of userIds) {
      const boardId = v4();
      await queryRunner.query(
        `INSERT INTO "board" ("id") VALUES ('${boardId}')`,
      );
      await queryRunner.query(`
        UPDATE "user" SET "boardId"='${boardId}' WHERE "id" = '${id}'
      `);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
