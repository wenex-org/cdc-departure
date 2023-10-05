import { MONGO_CONFIG } from '@app/common/configs';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

import { Ref, RefSchema } from './schema';
import { RefsService } from './refs.service';
import { RefsRepository } from './refs.repository';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_CONFIG()),
    MongooseModule.forFeature([{ name: Ref.name, schema: RefSchema }]),
  ],
  providers: [RefsService, RefsRepository],
  exports: [RefsService],
})
export class RefsModule {}
