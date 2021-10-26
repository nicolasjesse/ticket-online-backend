import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUser1624646437644 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'users',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'email',
          type: 'varchar',
          isUnique: true,
        },
        {
          name: 'password',
          type: 'varchar',
        }, {
          name: 'createdBy',
          type: 'varchar',
          isNullable: true,
        }, {
          name: 'createdAt',
          type: 'timestamptz',
          default: 'now()',
        }, {
          name: 'updatedBy',
          type: 'varchar',
          isNullable: true,
        }, {
          name: 'updatedAt',
          type: 'timestamptz',
          default: 'now()',
        }, {
          name: 'deletedBy',
          type: 'varchar',
          isNullable: true,
        }, {
          name: 'deletedAt',
          type: 'timestamptz',
          isNullable: true,
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
