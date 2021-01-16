import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserLastSeenAt1602437068339 implements MigrationInterface {
  name = 'UserLastSeenAt1602437068339';

  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
