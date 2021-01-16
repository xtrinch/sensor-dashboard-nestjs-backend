import { MigrationInterface, QueryRunner } from 'typeorm';

export class NullableSub1602441072000 implements MigrationInterface {
  name = 'NullableSub1602441072000';

  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
