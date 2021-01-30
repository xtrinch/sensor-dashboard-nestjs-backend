import { MigrationInterface, QueryRunner } from 'typeorm';

export class LastTopic1611519317936 implements MigrationInterface {
  name = 'LastTopic1611519317936';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "category" ADD "lastTopicId" integer`);
    await queryRunner.query(
      `ALTER TABLE "category" ADD CONSTRAINT "FK_73a867b045c3042cd176312b0b2" FOREIGN KEY ("lastTopicId") REFERENCES "topic"("id") ON DELETE SET NULL ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "category" DROP CONSTRAINT "FK_73a867b045c3042cd176312b0b2"`,
    );
    await queryRunner.query(`ALTER TABLE "category" DROP COLUMN "lastTopicId"`);
  }
}
