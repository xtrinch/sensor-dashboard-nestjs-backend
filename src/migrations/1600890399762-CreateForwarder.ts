import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateForwarder1600890399762 implements MigrationInterface {
  name = 'CreateForwarder1600890399762';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "forwarder" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastSeenAt" TIMESTAMP WITH TIME ZONE, "accessToken" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_4d5f8cc1a1b235f4a7a9df902e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "forwarder" ADD CONSTRAINT "FK_1621de4c88be5df51e63380d8a4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "forwarder" DROP CONSTRAINT "FK_1621de4c88be5df51e63380d8a4"`,
    );
    await queryRunner.query(`DROP TABLE "forwarder"`);
  }
}
