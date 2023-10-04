import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Fortest, FortestSchema } from './schema';
import { FortestService } from './fortest.service';
import { Fortest as FortestEntity } from './entity';
import { FortestSchedule } from './fortest.schedule';
import { FortestRepository } from './fortest.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FortestEntity]),
    MongooseModule.forFeature([{ name: Fortest.name, schema: FortestSchema }]),
  ],
  providers: [FortestService, FortestSchedule, FortestRepository],
})
export class FortestModule {}
