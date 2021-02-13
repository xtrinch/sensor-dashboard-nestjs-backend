import {MigrationInterface, QueryRunner} from "typeorm";

export class Radio1613138480985 implements MigrationInterface {
    name = 'Radio1613138480985'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "radio" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastSeenAt" TIMESTAMP WITH TIME ZONE, "accessToken" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" character varying NOT NULL, "userId" integer NOT NULL, "boardType" character varying NOT NULL, "config" jsonb, CONSTRAINT "PK_abac35f5ad988c18335b2d0d72e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "radio" ADD CONSTRAINT "FK_66fb779410ad52bdc52a23fe466" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "radio" DROP CONSTRAINT "FK_66fb779410ad52bdc52a23fe466"`);
        await queryRunner.query(`DROP TABLE "radio"`);
    }

}
