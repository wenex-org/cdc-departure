import { date, logger } from '@app/common/utils';
import { Injectable } from '@nestjs/common';

import { FortestRepository } from './fortest.repository';

@Injectable()
export class FortestService {
  private readonly log = logger(FortestService.name);

  constructor(readonly fortestRepository: FortestRepository) {}

  migrate(payload: any) {
    this.log.get(this.migrate.name).debug(date(`payload received with data %j`), payload);
  }
}
