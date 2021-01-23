import { MigrationInterface, QueryRunner } from 'typeorm';

export class MoreCascades1610903985120 implements MigrationInterface {
  name = 'MoreCascades1610903985120';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sensor" DROP CONSTRAINT "FK_f2d60ab56cca915cb0b1c300451"`,
    );
    await queryRunner.query(
      `ALTER TABLE "display" DROP CONSTRAINT "FK_9ba5d737aae475ee200d7e1170f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ADD CONSTRAINT "FK_f2d60ab56cca915cb0b1c300451" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "display" ADD CONSTRAINT "FK_9ba5d737aae475ee200d7e1170f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "display" DROP CONSTRAINT "FK_9ba5d737aae475ee200d7e1170f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" DROP CONSTRAINT "FK_f2d60ab56cca915cb0b1c300451"`,
    );
    await queryRunner.query(
      `ALTER TABLE "display" ADD CONSTRAINT "FK_9ba5d737aae475ee200d7e1170f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sensor" ADD CONSTRAINT "FK_f2d60ab56cca915cb0b1c300451" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
