import { FortestInterface, MongoSourcePayload } from '@app/common/interfaces';
import { date, logger } from '@app/common/utils';
import { Injectable } from '@nestjs/common';
import { filterByNotation } from 'abacl';
import { RefsService } from '@app/refs';

import { FortestRepository } from './fortest.repository';

@Injectable()
export class FortestService {
  private readonly log = logger(FortestService.name);

  constructor(
    private readonly refsService: RefsService,
    readonly fortestRepository: FortestRepository,
  ) {}

  async migrate(payload: MongoSourcePayload<FortestInterface>) {
    if (payload.after && !payload.after.ref) {
      const { _id: ref, ...data } = payload.after;

      const result = await this.fortestRepository.create({ ...data, ref: ref.$oid });

      return this.refsService.repository.create({ id: ref.$oid, ref: result.id });
    }

    if (!payload.after && payload.$oid) {
      const ref = await this.refsService.repository.findOne({ id: payload.$oid });

      await this.fortestRepository.deleteById(ref.ref);

      return this.refsService.repository.deleteOne(ref);
    }

    if (payload.after && payload.after.ref) {
      const { _id, ref, ...data } = payload.after;

      const update = filterByNotation(data, ['*', '!__v']);
      return this.fortestRepository.updateById(ref, { ...update, ref: _id.$oid });
    }

    this.log.get(this.migrate.name).warn(date(`payload was %j`), payload);
  }
}
