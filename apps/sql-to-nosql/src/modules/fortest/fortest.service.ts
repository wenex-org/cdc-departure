import { MysqlSourcePayload } from '@app/common/interfaces';
import { MongoId, date, logger } from '@app/common/utils';
import { FortestEntity } from '@app/common/entities';
import { Injectable } from '@nestjs/common';
import { RefsService } from '@app/refs';

import { FortestRepository } from './fortest.repository';

@Injectable()
export class FortestService {
  private readonly log = logger(FortestService.name);

  constructor(
    private readonly refsService: RefsService,
    readonly fortestRepository: FortestRepository,
  ) {}

  async migrate(payload: MysqlSourcePayload<FortestEntity>) {
    if (!payload.before && payload.after && !payload.after.ref) {
      const { id: ref, ...data } = payload.after;

      const _id = MongoId();
      await this.fortestRepository.create({ _id, ...data, ref });

      return this.refsService.repository.create({ ref, id: _id.toHexString() });
    }

    if (payload.before && !payload.after) {
      const { id: ref } = payload.before;

      await this.fortestRepository.deleteById(ref);

      return this.refsService.repository.deleteOne({ ref });
    }

    if (payload.before && payload.after) {
      const { id } = payload.before;
      const { id: ref, ...data } = payload.after;

      await this.fortestRepository.updateById(id, { ...data, ref });

      return this.refsService.repository.updateOne({ ref: id }, { ref });
    }

    this.log.get(this.migrate.name).warn(date(`payload was %j`), payload);
  }
}
