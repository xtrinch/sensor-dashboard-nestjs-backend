import {MigrationInterface, QueryRunner} from "typeorm";

export class ForwarderCascadeDelete1610903904396 implements MigrationInterface {
    name = 'ForwarderCascadeDelete1610903904396'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forwarder" DROP CONSTRAINT "FK_1621de4c88be5df51e63380d8a4"`);
        await queryRunner.query(`ALTER TABLE "forwarder" ADD CONSTRAINT "FK_1621de4c88be5df51e63380d8a4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "forwarder" DROP CONSTRAINT "FK_1621de4c88be5df51e63380d8a4"`);
        await queryRunner.query(`ALTER TABLE "forwarder" ADD CONSTRAINT "FK_1621de4c88be5df51e63380d8a4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
