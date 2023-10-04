import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { FortestService } from './fortest.service';
import { Fortest as FortestEntity } from './entity';
import { FortestController } from './fortest.controller';
import { FortestRepository } from './fortest.repository';
import { Fortest, FortestSchema, Ref, RefSchema } from './schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([FortestEntity]),
    MongooseModule.forFeature([
      { name: Ref.name, schema: RefSchema },
      { name: Fortest.name, schema: FortestSchema },
    ]),
  ],
  controllers: [FortestController],
  providers: [FortestService, FortestRepository],
})
export class FortestModule {}
