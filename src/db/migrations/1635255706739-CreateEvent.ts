import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEvent1635255706739 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'events',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'name',
          type: 'varchar',
        },
        {
          name: 'local',
          type: 'varchar',
        }, {
          name: 'date',
          type: 'varchar',
        }, {
          name: 'schedule',
          type: 'varchar',
        }, {
          name: 'price',
          type: 'float',
        }, {
          name: 'quantity',
          type: 'int4',
        }, {
          name: 'eventType',
          type: 'int4',
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
    await queryRunner.dropTable('events');
  }
}
