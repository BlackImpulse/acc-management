import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertDefaultValue1658143142401 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO person("name", "document", "birthDate") VALUES ('Sergei', 'document1', '2001-12-22'), ('Maxim', 'document2', '2000-02-09'), ('Vanya', 'document3', '2002-03-01');`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
