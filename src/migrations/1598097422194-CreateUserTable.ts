import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1598097422194 implements MigrationInterface {
  name = 'CreateUserTable1598097422194';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "email" character varying(128) NOT NULL, "username" character varying(128) NOT NULL, "password" character varying(128) NOT NULL, "isAdmin" boolean, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `INSERT INTO "user" ("username", "email", "password", "isAdmin") VALUES ('xtrinch', 'mojca.rojko@gmail.com', '$2b$10$MZNypNTQB2eG2HoIH2ctVuoVq3vtxW4ztwIiAz5d0CFJpwMViE0rq', true)`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ADD "userId" integer NOT NULL DEFAULT 1`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ALTER COLUMN "userId" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ADD CONSTRAINT "FK_f2d60ab56cca915cb0b1c300451" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor" DROP CONSTRAINT "FK_f2d60ab56cca915cb0b1c300451"`,
    );
    await queryRunner.query(`ALTER TABLE "sensor" DROP COLUMN "userId"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
