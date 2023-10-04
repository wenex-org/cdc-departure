import { Command, CommandRunner, Option } from 'nest-commander';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import * as seeds from './tables/seeds';

interface MysqlCommandOptions {
  entity?: string[] | true;
}

@Injectable()
@Command({
  name: 'mysql',
  arguments: '<task>',
  options: { isDefault: true },
  description: 'MysqlDB commands',
})
export class MysqlService extends CommandRunner {
  constructor(readonly dataSource: DataSource) {
    super();
  }

  async run(passedParams: string[], options?: MysqlCommandOptions): Promise<void> {
    if (passedParams.includes('seed')) await this.seed(options);
    if (passedParams.includes('drop')) await this.drop(options);
  }

  async seed(options?: MysqlCommandOptions): Promise<void> {
    console.log('Seeding mysql...');

    for (const entityName of Object.keys(seeds)) {
      if (this.cond(entityName, options)) {
        await this.dataSource
          .createQueryBuilder()
          .insert()
          .into(entityName)
          .values(seeds[entityName])
          .execute();

        console.log(
          '\x1b[32m%s\x1b[0m',
          `Inserted ${seeds[entityName].length} rows into the ${entityName} entity`,
        );
      }
    }

    console.log('Mysql seeded ;)');
  }

  async drop(options?: MysqlCommandOptions): Promise<void> {
    console.log('Dropping mysql...');

    const entities = this.dataSource.entityMetadatas;

    for (const entity of entities) {
      if (this.cond(entity.name, options)) {
        const repository = this.dataSource.getRepository(entity.name);
        await repository.clear();

        console.log('\x1b[32m%s\x1b[0m', `Dropped ${entity.name} entity from database.`);
      }
    }

    console.log('Mysql Dropped ;)');
  }

  @Option({
    required: false,
    defaultValue: true,
    flags: '-e, --entity [string]',
    description: 'Entity names',
  })
  parseString(val: string): MysqlCommandOptions['entity'] {
    return val.split(',');
  }

  private cond(entity: string, options?: MysqlCommandOptions): boolean {
    return (
      (typeof options?.entity === 'boolean' && options.entity) ||
      (typeof options?.entity === 'object' && options.entity.includes(entity))
    );
  }
}
