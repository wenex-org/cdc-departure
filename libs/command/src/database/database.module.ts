import { MYSQL_CONFIG } from '@app/common/configs';
import { Module } from '@nestjs/common';

import { MysqlModule } from './mysql';
import { FortestTable } from './mysql/entities';
import { DatabaseService } from './database.service';

@Module({
  imports: [MysqlModule.register(MYSQL_CONFIG(), [FortestTable])],
  providers: [DatabaseService],
})
export class DatabaseModule {}
