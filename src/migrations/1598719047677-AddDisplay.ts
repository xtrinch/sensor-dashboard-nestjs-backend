import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDisplay1598719047677 implements MigrationInterface {
    name = 'AddDisplay1598719047677'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "display" ("createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "displayAccessToken" uuid NOT NULL DEFAULT uuid_generate_v4(), "lastSeenAt" TIMESTAMP WITH TIME ZONE, "userId" integer NOT NULL, "location" character varying NOT NULL, "boardType" character varying NOT NULL, CONSTRAINT "PK_a182ee331ff540498c3fcad9923" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "display_sensors_display" ("displayId_1" integer NOT NULL, "displayId_2" integer NOT NULL, CONSTRAINT "PK_f7b8c2eff4acee6b07c8fd8bd8e" PRIMARY KEY ("displayId_1", "displayId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_23e5b76d8a7cf650c747674905" ON "display_sensors_display" ("displayId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_a09f9f2d5a319635a941ce1491" ON "display_sensors_display" ("displayId_2") `);
        await queryRunner.query(`ALTER TABLE "sensor" ADD "private" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "sensor" ALTER COLUMN "timezone" SET DEFAULT 'Europe/Vienna'`);
        await queryRunner.query(`ALTER TABLE "display" ADD CONSTRAINT "FK_9ba5d737aae475ee200d7e1170f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "display_sensors_display" ADD CONSTRAINT "FK_23e5b76d8a7cf650c747674905e" FOREIGN KEY ("displayId_1") REFERENCES "display"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "display_sensors_display" ADD CONSTRAINT "FK_a09f9f2d5a319635a941ce1491e" FOREIGN KEY ("displayId_2") REFERENCES "display"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "display_sensors_display" DROP CONSTRAINT "FK_a09f9f2d5a319635a941ce1491e"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_display" DROP CONSTRAINT "FK_23e5b76d8a7cf650c747674905e"`);
        await queryRunner.query(`ALTER TABLE "display" DROP CONSTRAINT "FK_9ba5d737aae475ee200d7e1170f"`);
        await queryRunner.query(`ALTER TABLE "sensor" ALTER COLUMN "timezone" SET DEFAULT 'Europe/Ljubljana'`);
        await queryRunner.query(`ALTER TABLE "sensor" DROP COLUMN "private"`);
        await queryRunner.query(`DROP INDEX "IDX_a09f9f2d5a319635a941ce1491"`);
        await queryRunner.query(`DROP INDEX "IDX_23e5b76d8a7cf650c747674905"`);
        await queryRunner.query(`DROP TABLE "display_sensors_display"`);
        await queryRunner.query(`DROP TABLE "display"`);
    }

}
