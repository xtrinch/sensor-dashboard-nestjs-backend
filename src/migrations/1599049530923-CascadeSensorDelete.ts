import { MigrationInterface, QueryRunner } from "typeorm";

export class CascadeSensorDelete1599049530923 implements MigrationInterface {
    name = 'CascadeSensorDelete1599049530923'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_15c864ea53c5f14b3db6104268e"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_15c864ea53c5f14b3db6104268e" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_15c864ea53c5f14b3db6104268e"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_15c864ea53c5f14b3db6104268e" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
