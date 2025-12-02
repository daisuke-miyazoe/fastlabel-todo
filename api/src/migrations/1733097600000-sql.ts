import {MigrationInterface, QueryRunner} from "typeorm";

export class sql1733097600000 implements MigrationInterface {
    name = 'sql1733097600000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`items\` ADD \`priority\` varchar(10) NOT NULL DEFAULT 'medium'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`items\` DROP COLUMN \`priority\``);
    }

}
