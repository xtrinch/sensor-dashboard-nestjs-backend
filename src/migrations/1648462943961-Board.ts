import { MigrationInterface, QueryRunner } from 'typeorm';

export class Board1648462943961 implements MigrationInterface {
  name = 'Board1648462943961';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "board" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "state" jsonb NOT NULL DEFAULT '{}', CONSTRAINT "PK_865a0f2e22c140d261b1df80eb1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "boardId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_1320cffdd7fd436b301154ae0d9" FOREIGN KEY ("boardId") REFERENCES "topic"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_1320cffdd7fd436b301154ae0d9"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "boardId"`);
    await queryRunner.query(`DROP TABLE "board"`);
  }
}
