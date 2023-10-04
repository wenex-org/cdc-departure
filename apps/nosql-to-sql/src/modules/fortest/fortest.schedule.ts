import { toKebabCase } from 'naming-conventions-modeler';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Timeout } from '@nestjs/schedule';
import { logger } from '@app/common/utils';
import { Model } from 'mongoose';

import { FortestService } from './fortest.service';
import { Fortest, FortestDocument } from './schema';

@Injectable()
export class FortestSchedule {
  private readonly log = logger(FortestSchedule.name);

  constructor(
    readonly fortestService: FortestService,
    @InjectModel(Fortest.name) readonly model: Model<FortestDocument>,
  ) {}

  @Timeout(5000)
  handleTimeout() {
    this.log
      .get(toKebabCase(this.handleTimeout.name))
      .debug('Called once after 5 seconds');
  }
}
