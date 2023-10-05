import { RefInterface } from '@app/common/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';

import { Ref, RefDocument } from './schema';

@Injectable()
export class RefsRepository {
  constructor(@InjectModel(Ref.name) readonly model: Model<RefDocument>) {}

  create(data: RefInterface) {
    return this.model.create(data);
  }

  findOne(filter: Partial<RefInterface>) {
    return this.model.findOne(filter).exec();
  }

  deleteOne(filter: Partial<RefInterface>): Promise<DeleteResult> {
    return this.model.deleteOne(filter).exec();
  }

  updateOne(filter: Partial<RefInterface>, data: Partial<RefInterface>) {
    return this.model.updateOne(filter, data).exec();
  }
}
