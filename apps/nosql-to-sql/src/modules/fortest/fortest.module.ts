import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RefsModule } from '@app/refs';

import { FortestService } from './fortest.service';
import { Fortest as FortestEntity } from './entity';
import { FortestController } from './fortest.controller';
import { FortestRepository } from './fortest.repository';

@Module({
  imports: [RefsModule, TypeOrmModule.forFeature([FortestEntity])],
  controllers: [FortestController],
  providers: [FortestService, FortestRepository],
})
export class FortestModule {}
