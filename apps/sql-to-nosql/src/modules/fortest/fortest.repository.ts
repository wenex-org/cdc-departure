import { FortestInterface } from '@app/common/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'mongodb';
import { Model } from 'mongoose';

import { Fortest, FortestDocument } from './schema';

@Injectable()
export class FortestRepository {
  constructor(@InjectModel(Fortest.name) readonly model: Model<FortestDocument>) {}

  create(data: FortestInterface) {
    return this.model.create(data);
  }

  deleteById(id: number): Promise<DeleteResult> {
    return this.model.deleteOne({ ref: id }).exec();
  }

  updateById(id: number, data: Partial<FortestInterface>) {
    return this.model.updateOne({ ref: id }, data).exec();
  }
}
