import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameAccessTokenFields1600888390919
  implements MigrationInterface {
  name = 'RenameAccessTokenFields1600888390919';

  public async up(queryRunner: QueryRunner): Promise<void> {
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
