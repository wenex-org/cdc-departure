import { MYSQL_CONFIG } from '@app/common/configs';
import { Fortest } from '@app/common/entities';
import { Module } from '@nestjs/common';

import { MysqlModule } from './mysql';
import { DatabaseService } from './database.service';

@Module({
  imports: [MysqlModule.register(MYSQL_CONFIG(), [Fortest])],
  providers: [DatabaseService],
})
export class DatabaseModule {}
