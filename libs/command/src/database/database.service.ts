import { Command, CommandRunner, Option } from 'nest-commander';
import { Injectable } from '@nestjs/common';

import { MysqlService } from './mysql/mysql.service';

interface DatabaseCommandOptions {
  database?: true | { mysql?: boolean };
}

@Injectable()
@Command({
  name: 'db',
  arguments: '<task>',
  description: 'db commands',
  subCommands: [MysqlService],
})
export class DatabaseService extends CommandRunner {
  constructor(readonly mysqlService: MysqlService) {
    super();
  }

  async run(passedParams: string[], options?: DatabaseCommandOptions): Promise<void> {
    if (passedParams.includes('seed')) await this.seed(options);
    if (passedParams.includes('clean')) await this.clean(options);
  }

  async seed(options?: DatabaseCommandOptions): Promise<void> {
    console.log('Seeding database...');

    if (this.cond('mysql', options)) await this.mysqlService.seed({ entity: true });

    console.log('Database seeded ;)');
  }

  async clean(options?: DatabaseCommandOptions): Promise<void> {
    console.log('Clearing database ...');

    if (this.cond('mysql', options)) await this.mysqlService.drop({ entity: true });

    console.log('Database cleared ;)');
  }

  @Option({
    required: false,
    defaultValue: true,
    flags: '-db, --database [string]',
    description: 'database',
  })
  parseString(val: string): DatabaseCommandOptions['database'] {
    return {
      mysql: val.split(',').includes('mysql'),
    };
  }

  private cond(db: string, options?: DatabaseCommandOptions) {
    return (
      (typeof options?.database === 'boolean' && options.database) ||
      (typeof options?.database === 'object' && options.database[db])
    );
  }
}
