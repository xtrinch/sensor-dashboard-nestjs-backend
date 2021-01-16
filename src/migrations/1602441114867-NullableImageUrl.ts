import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableImageUrl1602441114867 implements MigrationInterface {
  name = 'NullableImageUrl1602441114867';

  // this is actually a squash migration now
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "measurement" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "measurement" double precision NOT NULL, "measurementType" character varying NOT NULL, "sensorId" integer NOT NULL, CONSTRAINT "PK_742ff3cc0dcbbd34533a9071dfd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "forwarder" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastSeenAt" TIMESTAMP WITH TIME ZONE, "accessToken" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" character varying NOT NULL, "userId" integer NOT NULL, "boardType" character varying NOT NULL, "numForwarded" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_4d5f8cc1a1b235f4a7a9df902e1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "sub" character varying, "imageUrl" character varying, "email" character varying(128) NOT NULL, "username" character varying(128) NOT NULL, "password" character varying(128), "isAdmin" boolean, "name" character varying NOT NULL, "surname" character varying NOT NULL, "lastSeenAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sensor" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastSeenAt" TIMESTAMP WITH TIME ZONE, "accessToken" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" character varying NOT NULL, "userId" integer NOT NULL, "boardType" character varying NOT NULL, "displayName" character varying NOT NULL, "measurementTypes" text array NOT NULL, "sensorTypes" text array NOT NULL, "timezone" character varying NOT NULL DEFAULT 'Europe/Vienna', "private" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_ccc38b9aa8b3e198b6503d5eee9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "display" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "lastSeenAt" TIMESTAMP WITH TIME ZONE, "accessToken" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "location" character varying NOT NULL, "userId" integer NOT NULL, "boardType" character varying NOT NULL, "displayType" character varying NOT NULL, "measurementTypes" text array NOT NULL, CONSTRAINT "PK_a182ee331ff540498c3fcad9923" PRIMARY KEY ("id"))`,
    );
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
      `ALTER TABLE "measurement" ADD CONSTRAINT "FK_15c864ea53c5f14b3db6104268e" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "forwarder" ADD CONSTRAINT "FK_1621de4c88be5df51e63380d8a4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ADD CONSTRAINT "FK_f2d60ab56cca915cb0b1c300451" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "display" ADD CONSTRAINT "FK_9ba5d737aae475ee200d7e1170f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "display" DROP CONSTRAINT "FK_9ba5d737aae475ee200d7e1170f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" DROP CONSTRAINT "FK_f2d60ab56cca915cb0b1c300451"`,
    );
    await queryRunner.query(
      `ALTER TABLE "forwarder" DROP CONSTRAINT "FK_1621de4c88be5df51e63380d8a4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "measurement" DROP CONSTRAINT "FK_15c864ea53c5f14b3db6104268e"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_7fcb19e5bf1fb2e83817dbaa41"`);
    await queryRunner.query(`DROP INDEX "IDX_970234925bc87567e162d2ad32"`);
    await queryRunner.query(`DROP TABLE "display_sensors_sensor"`);
    await queryRunner.query(`DROP TABLE "display"`);
    await queryRunner.query(`DROP TABLE "sensor"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "forwarder"`);
    await queryRunner.query(`DROP TABLE "measurement"`);
  }
}
