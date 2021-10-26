import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTicket1635256294705 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'tickets',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        }, {
          name: 'paymentStatus',
          type: 'int4',
        }, {
          name: 'userId',
          type: 'uuid',
        }, {
          name: 'eventId',
          type: 'uuid',
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
      foreignKeys: [
        {
          columnNames: ['userId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
        },
        {
          columnNames: ['eventId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'events',
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tickets');
  }
}
