import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDisplayNameToSensor1599377850375 implements MigrationInterface {
  name = 'AddDisplayNameToSensor1599377850375';

  public async up(queryRunner: QueryRunner): Promise<void> {
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
