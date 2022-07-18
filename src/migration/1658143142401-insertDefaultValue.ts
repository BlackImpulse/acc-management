import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertDefaultValue1658143142401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO person("name", "document", "birthDate") VALUES ('Sergei', 'document1', '2001-12-22'), ('Maxim', 'document2', '2000-02-09'), ('Vanya', 'document3', '2002-03-01');`,
    );
    await queryRunner.query(
      `INSERT INTO account("balance", "dailyWithdrawalLimit", "activeFlag", "accountType", "createDate", "personId") VALUES  ('100', '1000', true, '1', '2001-01-01', 1), ('200', '2000', true, '2', '2001-01-02', 2), ('300', '1000', true, '3', '2001-01-03', 3);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
