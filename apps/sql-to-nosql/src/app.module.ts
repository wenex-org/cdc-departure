import { Module } from '@nestjs/common';
import { SqlToNosqlController } from './sql-to-nosql.controller';
import { SqlToNosqlService } from './sql-to-nosql.service';

@Module({
  imports: [],
  controllers: [SqlToNosqlController],
  providers: [SqlToNosqlService],
})
export class SqlToNosqlModule {}
