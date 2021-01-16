import { MigrationInterface, QueryRunner } from 'typeorm';

export class AbstractEntitySmall1608999606506 implements MigrationInterface {
  name = 'AbstractEntitySmall1608999606506';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurement" DROP COLUMN "updatedAt"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "measurement" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }
}
