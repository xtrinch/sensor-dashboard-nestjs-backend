import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSensorLastSeenAt1598257446063 implements MigrationInterface {
  name = 'AddSensorLastSeenAt1598257446063';

  public async up(queryRunner: QueryRunner): Promise<void> {}

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
