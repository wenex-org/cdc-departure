/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
require('log-node')();

import { CommandFactory } from 'nest-commander';

import { CommandModule } from './command.module';

async function bootstrap() {
  // or, if you only want to print Nest's warnings and errors
  await CommandFactory.run(CommandModule, ['log', 'warn', 'error', 'debug']);
}
bootstrap();
