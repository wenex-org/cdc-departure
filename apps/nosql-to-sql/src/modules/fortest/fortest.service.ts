import { Injectable } from '@nestjs/common';

import { FortestRepository } from './fortest.repository';

@Injectable()
export class FortestService {
  constructor(readonly fortestRepository: FortestRepository) {}

  migrate(payload: any) {
    console.log(payload);
  }
}
