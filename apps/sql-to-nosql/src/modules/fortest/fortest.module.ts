import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Fortest, FortestSchema } from './schema';
import { FortestService } from './fortest.service';
import { FortestController } from './fortest.controller';
import { FortestRepository } from './fortest.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Fortest.name, schema: FortestSchema }])],
  controllers: [FortestController],
  providers: [FortestService, FortestRepository],
})
export class FortestModule {}
