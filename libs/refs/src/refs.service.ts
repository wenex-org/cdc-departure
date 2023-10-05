import { Injectable } from '@nestjs/common';

import { RefsRepository } from './refs.repository';

@Injectable()
export class RefsService {
  constructor(readonly repository: RefsRepository) {}
}
