import {MigrationInterface, QueryRunner} from "typeorm";

export class Board1648464688642 implements MigrationInterface {
    name = 'Board1648464688642'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1320cffdd7fd436b301154ae0d9"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "FK_7fcb19e5bf1fb2e83817dbaa41f"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "FK_970234925bc87567e162d2ad327"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1320cffdd7fd436b301154ae0d9" FOREIGN KEY ("boardId") REFERENCES "board"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "FK_970234925bc87567e162d2ad327" FOREIGN KEY ("displayId") REFERENCES "display"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "FK_7fcb19e5bf1fb2e83817dbaa41f" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "FK_7fcb19e5bf1fb2e83817dbaa41f"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "FK_970234925bc87567e162d2ad327"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_1320cffdd7fd436b301154ae0d9"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "FK_970234925bc87567e162d2ad327" FOREIGN KEY ("displayId") REFERENCES "display"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "FK_7fcb19e5bf1fb2e83817dbaa41f" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_1320cffdd7fd436b301154ae0d9" FOREIGN KEY ("boardId") REFERENCES "topic"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
