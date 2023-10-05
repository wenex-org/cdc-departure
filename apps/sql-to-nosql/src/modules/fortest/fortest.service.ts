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

  migrate(payload: MysqlSourcePayload<FortestEntity>) {
    if (!payload.before && payload.after) {
      const { id: ref, ...data } = payload.after;

      const _id = MongoId();
      this.refsService.repository.create({ ref, id: _id.toHexString() });

      return this.fortestRepository.create({ _id, ref, ...data });
    }

    if (payload.before && !payload.after) {
      const { id: ref } = payload.before;

      this.refsService.repository.deleteOne({ ref });

      return this.fortestRepository.deleteById(ref);
    }

    if (payload.before && payload.after) {
      const { id } = payload.before;
      const { id: ref, ...data } = payload.after;

      this.refsService.repository.updateOne({ ref: id }, { ref, ...data });

      return this.fortestRepository.updateById(id, { ref, ...data });
    }

    this.log.get(this.migrate.name).warn(date(`payload was empty.`));
  }
}
