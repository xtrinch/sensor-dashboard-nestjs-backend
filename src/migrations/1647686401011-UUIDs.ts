import {MigrationInterface, QueryRunner} from "typeorm";

export class UUIDs1647686401011 implements MigrationInterface {
    name = 'UUIDs1647686401011'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_15c864ea53c5f14b3db6104268e"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "PK_742ff3cc0dcbbd34533a9071dfd"`);

        // measurement primary key
        await queryRunner.query(`ALTER TABLE "measurement" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "measurement" ALTER COLUMN "id" SET DATA TYPE UUID USING LPAD(TO_HEX("id"), 32, '0')::UUID`);
        await queryRunner.query(`ALTER TABLE "measurement" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "PK_742ff3cc0dcbbd34533a9071dfd" PRIMARY KEY ("id")`);
        // await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "id"`);
        // await queryRunner.query(`ALTER TABLE "measurement" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);

        await queryRunner.query(`ALTER TABLE "measurement" ALTER COLUMN "sensorId" SET DATA TYPE UUID USING LPAD(TO_HEX("sensorId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "sensorId"`);
        // await queryRunner.query(`ALTER TABLE "measurement" ADD "sensorId" uuid NOT NULL`);

        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "FK_7fcb19e5bf1fb2e83817dbaa41f"`);
        await queryRunner.query(`ALTER TABLE "sensor" DROP CONSTRAINT "FK_f2d60ab56cca915cb0b1c300451"`);
        await queryRunner.query(`ALTER TABLE "sensor" DROP CONSTRAINT "PK_ccc38b9aa8b3e198b6503d5eee9"`);

        // sensor primary key
        await queryRunner.query(`ALTER TABLE "sensor" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sensor" ALTER COLUMN "id" SET DATA TYPE UUID USING LPAD(TO_HEX("id"), 32, '0')::UUID`);
        await queryRunner.query(`ALTER TABLE "sensor" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "sensor" ADD CONSTRAINT "PK_ccc38b9aa8b3e198b6503d5eee9" PRIMARY KEY ("id")`);
        // await queryRunner.query(`ALTER TABLE "sensor" DROP COLUMN "id"`);
        // await queryRunner.query(`ALTER TABLE "sensor" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);

        await queryRunner.query(`ALTER TABLE "sensor" ALTER COLUMN "userId" SET DATA TYPE UUID USING LPAD(TO_HEX("userId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "sensor" DROP COLUMN "userId"`);
        // await queryRunner.query(`ALTER TABLE "sensor" ADD "userId" uuid NOT NULL`);

        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "FK_970234925bc87567e162d2ad327"`);
        await queryRunner.query(`ALTER TABLE "display" DROP CONSTRAINT "FK_9ba5d737aae475ee200d7e1170f"`);
        await queryRunner.query(`ALTER TABLE "display" DROP CONSTRAINT "PK_a182ee331ff540498c3fcad9923"`);

        // display primary key
        await queryRunner.query(`ALTER TABLE "display" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "display" ALTER COLUMN "id" SET DATA TYPE UUID USING LPAD(TO_HEX("id"), 32, '0')::UUID`);
        await queryRunner.query(`ALTER TABLE "display" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "display" ADD CONSTRAINT "PK_a182ee331ff540498c3fcad9923" PRIMARY KEY ("id")`);
        // await queryRunner.query(`ALTER TABLE "display" DROP COLUMN "id"`);
        // await queryRunner.query(`ALTER TABLE "display" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);

        await queryRunner.query(`ALTER TABLE "display" ALTER COLUMN "userId" SET DATA TYPE UUID USING LPAD(TO_HEX("userId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "display" DROP COLUMN "userId"`);
        // await queryRunner.query(`ALTER TABLE "display" ADD "userId" uuid NOT NULL`);

        await queryRunner.query(`ALTER TABLE "forwarder" DROP CONSTRAINT "FK_1621de4c88be5df51e63380d8a4"`);
        await queryRunner.query(`ALTER TABLE "forwarder" DROP CONSTRAINT "PK_4d5f8cc1a1b235f4a7a9df902e1"`);


        // forwarder primary key
        await queryRunner.query(`ALTER TABLE "forwarder" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "forwarder" ALTER COLUMN "id" SET DATA TYPE UUID USING LPAD(TO_HEX("id"), 32, '0')::UUID`);
        await queryRunner.query(`ALTER TABLE "forwarder" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "forwarder" ADD CONSTRAINT "PK_4d5f8cc1a1b235f4a7a9df902e1" PRIMARY KEY ("id")`);
        // await queryRunner.query(`ALTER TABLE "forwarder" DROP COLUMN "id"`);
        // await queryRunner.query(`ALTER TABLE "forwarder" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        
        await queryRunner.query(`ALTER TABLE "forwarder" ALTER COLUMN "userId" SET DATA TYPE UUID USING LPAD(TO_HEX("userId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "forwarder" DROP COLUMN "userId"`);
        // await queryRunner.query(`ALTER TABLE "forwarder" ADD "userId" uuid NOT NULL`);

        await queryRunner.query(`ALTER TABLE "radio" DROP CONSTRAINT "FK_66fb779410ad52bdc52a23fe466"`);
        await queryRunner.query(`ALTER TABLE "radio" DROP CONSTRAINT "PK_abac35f5ad988c18335b2d0d72e"`);

        await queryRunner.query(`ALTER TABLE "radio" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "radio" ALTER COLUMN "id" SET DATA TYPE UUID USING LPAD(TO_HEX("id"), 32, '0')::UUID`);
        await queryRunner.query(`ALTER TABLE "radio" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "radio" ADD CONSTRAINT "PK_abac35f5ad988c18335b2d0d72e" PRIMARY KEY ("id")`);
        // await queryRunner.query(`ALTER TABLE "radio" DROP COLUMN "id"`);
        // await queryRunner.query(`ALTER TABLE "radio" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);

        await queryRunner.query(`ALTER TABLE "radio" ALTER COLUMN "userId" SET DATA TYPE UUID USING LPAD(TO_HEX("userId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "radio" DROP COLUMN "userId"`);
        // await queryRunner.query(`ALTER TABLE "radio" ADD "userId" uuid NOT NULL`);

        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_106101142fbf646320c4d7ae231"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);

        // user primary key
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE UUID USING LPAD(TO_HEX("id"), 32, '0')::UUID`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        // await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        // await queryRunner.query(`ALTER TABLE "user" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);

        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_73a867b045c3042cd176312b0b2"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_b57a5333a16e092c662bd8ff5fe"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_f8bf220112570b5c2be647f0942"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_1ac9851d7efd0de4f3a171bbcff"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61"`);

        // topic primary key
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "id" SET DATA TYPE UUID USING LPAD(TO_HEX("id"), 32, '0')::UUID`);
        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id")`);
        // await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "id"`);
        // await queryRunner.query(`ALTER TABLE "topic" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);

        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "categoryId" SET DATA TYPE UUID USING LPAD(TO_HEX("categoryId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "categoryId"`);
        // await queryRunner.query(`ALTER TABLE "topic" ADD "categoryId" uuid NOT NULL`);

        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "userId" SET DATA TYPE UUID USING LPAD(TO_HEX("userId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "userId"`);
        // await queryRunner.query(`ALTER TABLE "topic" ADD "userId" uuid NOT NULL`);

        await queryRunner.query(`ALTER TABLE "topic" ALTER COLUMN "lastCommentId" SET DATA TYPE UUID USING LPAD(TO_HEX("lastCommentId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "lastCommentId"`);
        // await queryRunner.query(`ALTER TABLE "topic" ADD "lastCommentId" uuid`);

        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_770b58eacf7b21f92db7b3f0803"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_1ad29c0ce9873ed4cd40df4982e"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2"`);

        // topic primary key
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "id" SET DATA TYPE UUID USING LPAD(TO_HEX("id"), 32, '0')::UUID`);
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")`);
        // await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "id"`);
        // await queryRunner.query(`ALTER TABLE "comment" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        
        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "topicId" SET DATA TYPE UUID USING LPAD(TO_HEX("topicId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "topicId"`);
        // await queryRunner.query(`ALTER TABLE "comment" ADD "topicId" uuid NOT NULL`);

        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "categoryId" SET DATA TYPE UUID USING LPAD(TO_HEX("categoryId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "categoryId"`);
        // await queryRunner.query(`ALTER TABLE "comment" ADD "categoryId" uuid NOT NULL`);

        await queryRunner.query(`ALTER TABLE "comment" ALTER COLUMN "userId" SET DATA TYPE UUID USING LPAD(TO_HEX("userId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "userId"`);
        // await queryRunner.query(`ALTER TABLE "comment" ADD "userId" uuid NOT NULL`);

        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`);

        // topic primary key
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" SET DATA TYPE UUID USING LPAD(TO_HEX("id"), 32, '0')::UUID`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`);
        // await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        // await queryRunner.query(`ALTER TABLE "category" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);

        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "lastCommentId" SET DATA TYPE UUID USING LPAD(TO_HEX("lastCommentId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "lastCommentId"`);
        // await queryRunner.query(`ALTER TABLE "category" ADD "lastCommentId" uuid`);

        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "lastTopicId" SET DATA TYPE UUID USING LPAD(TO_HEX("lastTopicId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "lastTopicId"`);
        // await queryRunner.query(`ALTER TABLE "category" ADD "lastTopicId" uuid`);

        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "PK_0db5830b3550b77bf64c63b1126"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "PK_7fcb19e5bf1fb2e83817dbaa41f" PRIMARY KEY ("sensorId")`);
        await queryRunner.query(`DROP INDEX "IDX_970234925bc87567e162d2ad32"`);

        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ALTER COLUMN "displayId" SET DATA TYPE UUID USING LPAD(TO_HEX("displayId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP COLUMN "displayId"`);
        // await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD "displayId" uuid NOT NULL`);

        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "PK_7fcb19e5bf1fb2e83817dbaa41f"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "PK_0db5830b3550b77bf64c63b1126" PRIMARY KEY ("sensorId", "displayId")`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "PK_0db5830b3550b77bf64c63b1126"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "PK_970234925bc87567e162d2ad327" PRIMARY KEY ("displayId")`);
        await queryRunner.query(`DROP INDEX "IDX_7fcb19e5bf1fb2e83817dbaa41"`);

        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ALTER COLUMN "sensorId" SET DATA TYPE UUID USING LPAD(TO_HEX("sensorId"), 32, '0')::UUID`);
        // await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP COLUMN "sensorId"`);
        // await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD "sensorId" uuid NOT NULL`);

        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "PK_970234925bc87567e162d2ad327"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "PK_0db5830b3550b77bf64c63b1126" PRIMARY KEY ("displayId", "sensorId")`);
        await queryRunner.query(`CREATE INDEX "IDX_970234925bc87567e162d2ad32" ON "display_sensors_sensor" ("displayId") `);
        await queryRunner.query(`CREATE INDEX "IDX_7fcb19e5bf1fb2e83817dbaa41" ON "display_sensors_sensor" ("sensorId") `);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_15c864ea53c5f14b3db6104268e" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sensor" ADD CONSTRAINT "FK_f2d60ab56cca915cb0b1c300451" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "display" ADD CONSTRAINT "FK_9ba5d737aae475ee200d7e1170f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forwarder" ADD CONSTRAINT "FK_1621de4c88be5df51e63380d8a4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "radio" ADD CONSTRAINT "FK_66fb779410ad52bdc52a23fe466" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_f8bf220112570b5c2be647f0942" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_106101142fbf646320c4d7ae231" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_1ac9851d7efd0de4f3a171bbcff" FOREIGN KEY ("lastCommentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_b57a5333a16e092c662bd8ff5fe" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_1ad29c0ce9873ed4cd40df4982e" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_770b58eacf7b21f92db7b3f0803" FOREIGN KEY ("lastCommentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_73a867b045c3042cd176312b0b2" FOREIGN KEY ("lastTopicId") REFERENCES "topic"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "FK_970234925bc87567e162d2ad327" FOREIGN KEY ("displayId") REFERENCES "display"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "FK_7fcb19e5bf1fb2e83817dbaa41f" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "FK_7fcb19e5bf1fb2e83817dbaa41f"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "FK_970234925bc87567e162d2ad327"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_73a867b045c3042cd176312b0b2"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_770b58eacf7b21f92db7b3f0803"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_1ad29c0ce9873ed4cd40df4982e"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_b57a5333a16e092c662bd8ff5fe"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_1ac9851d7efd0de4f3a171bbcff"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_106101142fbf646320c4d7ae231"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "FK_f8bf220112570b5c2be647f0942"`);
        await queryRunner.query(`ALTER TABLE "radio" DROP CONSTRAINT "FK_66fb779410ad52bdc52a23fe466"`);
        await queryRunner.query(`ALTER TABLE "forwarder" DROP CONSTRAINT "FK_1621de4c88be5df51e63380d8a4"`);
        await queryRunner.query(`ALTER TABLE "display" DROP CONSTRAINT "FK_9ba5d737aae475ee200d7e1170f"`);
        await queryRunner.query(`ALTER TABLE "sensor" DROP CONSTRAINT "FK_f2d60ab56cca915cb0b1c300451"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "FK_15c864ea53c5f14b3db6104268e"`);
        await queryRunner.query(`DROP INDEX "IDX_7fcb19e5bf1fb2e83817dbaa41"`);
        await queryRunner.query(`DROP INDEX "IDX_970234925bc87567e162d2ad32"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "PK_0db5830b3550b77bf64c63b1126"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "PK_970234925bc87567e162d2ad327" PRIMARY KEY ("displayId")`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP COLUMN "sensorId"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD "sensorId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_7fcb19e5bf1fb2e83817dbaa41" ON "display_sensors_sensor" ("sensorId") `);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "PK_970234925bc87567e162d2ad327"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "PK_0db5830b3550b77bf64c63b1126" PRIMARY KEY ("sensorId", "displayId")`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "PK_0db5830b3550b77bf64c63b1126"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "PK_7fcb19e5bf1fb2e83817dbaa41f" PRIMARY KEY ("sensorId")`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP COLUMN "displayId"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD "displayId" integer NOT NULL`);
        await queryRunner.query(`CREATE INDEX "IDX_970234925bc87567e162d2ad32" ON "display_sensors_sensor" ("displayId") `);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" DROP CONSTRAINT "PK_7fcb19e5bf1fb2e83817dbaa41f"`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "PK_0db5830b3550b77bf64c63b1126" PRIMARY KEY ("displayId", "sensorId")`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "lastTopicId"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "lastTopicId" integer`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "lastCommentId"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "lastCommentId" integer`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03"`);
        await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "category" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "categoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "topicId"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "topicId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_1ad29c0ce9873ed4cd40df4982e" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_770b58eacf7b21f92db7b3f0803" FOREIGN KEY ("lastCommentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "lastCommentId"`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "lastCommentId" integer`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "categoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topic" DROP CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61"`);
        await queryRunner.query(`ALTER TABLE "topic" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "topic" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_1ac9851d7efd0de4f3a171bbcff" FOREIGN KEY ("lastCommentId") REFERENCES "comment"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_f8bf220112570b5c2be647f0942" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_b57a5333a16e092c662bd8ff5fe" FOREIGN KEY ("topicId") REFERENCES "topic"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_73a867b045c3042cd176312b0b2" FOREIGN KEY ("lastTopicId") REFERENCES "topic"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "topic" ADD CONSTRAINT "FK_106101142fbf646320c4d7ae231" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "radio" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "radio" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "radio" DROP CONSTRAINT "PK_abac35f5ad988c18335b2d0d72e"`);
        await queryRunner.query(`ALTER TABLE "radio" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "radio" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "radio" ADD CONSTRAINT "PK_abac35f5ad988c18335b2d0d72e" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "radio" ADD CONSTRAINT "FK_66fb779410ad52bdc52a23fe466" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "forwarder" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "forwarder" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "forwarder" DROP CONSTRAINT "PK_4d5f8cc1a1b235f4a7a9df902e1"`);
        await queryRunner.query(`ALTER TABLE "forwarder" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "forwarder" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "forwarder" ADD CONSTRAINT "PK_4d5f8cc1a1b235f4a7a9df902e1" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "forwarder" ADD CONSTRAINT "FK_1621de4c88be5df51e63380d8a4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "display" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "display" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "display" DROP CONSTRAINT "PK_a182ee331ff540498c3fcad9923"`);
        await queryRunner.query(`ALTER TABLE "display" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "display" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "display" ADD CONSTRAINT "PK_a182ee331ff540498c3fcad9923" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "display" ADD CONSTRAINT "FK_9ba5d737aae475ee200d7e1170f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "FK_970234925bc87567e162d2ad327" FOREIGN KEY ("displayId") REFERENCES "display"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sensor" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "sensor" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sensor" DROP CONSTRAINT "PK_ccc38b9aa8b3e198b6503d5eee9"`);
        await queryRunner.query(`ALTER TABLE "sensor" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "sensor" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sensor" ADD CONSTRAINT "PK_ccc38b9aa8b3e198b6503d5eee9" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "sensor" ADD CONSTRAINT "FK_f2d60ab56cca915cb0b1c300451" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "display_sensors_sensor" ADD CONSTRAINT "FK_7fcb19e5bf1fb2e83817dbaa41f" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "sensorId"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "sensorId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP CONSTRAINT "PK_742ff3cc0dcbbd34533a9071dfd"`);
        await queryRunner.query(`ALTER TABLE "measurement" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "PK_742ff3cc0dcbbd34533a9071dfd" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "measurement" ADD CONSTRAINT "FK_15c864ea53c5f14b3db6104268e" FOREIGN KEY ("sensorId") REFERENCES "sensor"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
