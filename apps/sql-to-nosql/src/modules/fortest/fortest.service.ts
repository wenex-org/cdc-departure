import { SourcePayload } from '@app/common/interfaces';
import { date, logger } from '@app/common/utils';
import { Injectable } from '@nestjs/common';

import { FortestEntity } from './entity';
import { FortestRepository } from './fortest.repository';

@Injectable()
export class FortestService {
  private readonly log = logger(FortestService.name);

  constructor(readonly fortestRepository: FortestRepository) {}

  migrate(payload: SourcePayload<FortestEntity>) {
    if (!payload.before && payload.after) {
      const { id: ref, ...data } = payload.after;
      return this.fortestRepository.create({ ref, ...data });
    }

    if (payload.before && !payload.after) {
      const { id: ref } = payload.before;
      return this.fortestRepository.deleteById(ref);
    }

    if (payload.before && payload.after) {
      const { id } = payload.before;
      const { id: ref, ...data } = payload.after;
      return this.fortestRepository.updateById(id, { ref, ...data });
    }

    this.log.get(this.migrate.name).warn(date(`payload was empty.`));
  }
}
