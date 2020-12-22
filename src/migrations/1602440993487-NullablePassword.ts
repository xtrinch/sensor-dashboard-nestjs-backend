import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullablePassword1602440993487 implements MigrationInterface {
  name = 'NullablePassword1602440993487';

  public async up(queryRunner: QueryRunner): Promise<void> {
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
