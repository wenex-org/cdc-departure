import { Fortest, FortestDocument } from '@app/common/schemas';
import { FortestInterface } from '@app/common/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class FortestRepository {
  constructor(@InjectModel(Fortest.name) readonly model: Model<FortestDocument>) {}

  create(data: FortestInterface) {
    this.model.create(data);
  }

  deleteById(id: number) {
    this.model.deleteOne({ ref: id });
  }

  updateById(id: number, data: Partial<FortestInterface>) {
    this.model.updateOne({ ref: id }, data);
  }
}
