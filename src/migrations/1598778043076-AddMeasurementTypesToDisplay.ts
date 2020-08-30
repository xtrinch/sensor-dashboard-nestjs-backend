import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMeasurementTypesToDisplay1598778043076
  implements MigrationInterface {
  name = 'AddMeasurementTypesToDisplay1598778043076';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "display_sensors_sensor" ("displayId" integer NOT NULL, "sensorId" integer NOT NULL, CONSTRAINT "PK_0db5830b3550b77bf64c63b1126" PRIMARY KEY ("displayId", "sensorId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_970234925bc87567e162d2ad32" ON "display_sensors_sensor" ("displayId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7fcb19e5bf1fb2e83817dbaa41" ON "display_sensors_sensor" ("sensorId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "display" ADD "measurementTypes" text array NOT NULL DEFAULT array[]::text[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ALTER COLUMN "measurementTypes" SET DEFAULT array[]::text[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "FK_970234925bc87567e162d2ad327" FOREIGN KEY ("displayId") REFERENCES "display"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "FK_7fcb19e5bf1fb2e83817dbaa41f" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "FK_7fcb19e5bf1fb2e83817dbaa41f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "FK_970234925bc87567e162d2ad327"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ALTER COLUMN "measurementTypes" SET DEFAULT ARRAY[]`,
    );
    await queryRunner.query(
      `ALTER TABLE "display" DROP COLUMN "measurementTypes"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_7fcb19e5bf1fb2e83817dbaa41"`);
    await queryRunner.query(`DROP INDEX "IDX_970234925bc87567e162d2ad32"`);
    await queryRunner.query(`DROP TABLE "display_sensors_sensor"`);
  }
}
