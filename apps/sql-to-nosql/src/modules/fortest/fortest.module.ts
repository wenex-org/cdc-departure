import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { RefsModule } from '@app/refs';

import { Fortest, FortestSchema } from './schema';
import { FortestService } from './fortest.service';
import { FortestController } from './fortest.controller';
import { FortestRepository } from './fortest.repository';

@Module({
  imports: [
    RefsModule,
    MongooseModule.forFeature([{ name: Fortest.name, schema: FortestSchema }]),
  ],
  controllers: [FortestController],
  providers: [FortestService, FortestRepository],
})
export class FortestModule {}
