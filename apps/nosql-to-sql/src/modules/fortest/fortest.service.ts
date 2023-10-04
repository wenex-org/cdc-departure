import { FortestInterface } from '@app/common/interfaces';
import { Injectable } from '@nestjs/common';

import { FortestDocument } from './schema';
import { FortestRepository } from './fortest.repository';

@Injectable()
export class FortestService {
  constructor(readonly fortestRepository: FortestRepository) {}

  create(data: FortestDocument) {
    const { ref: id, ...rest } = data.toJSON<FortestInterface>();
    return this.fortestRepository.create({ id, ...rest });
  }

  deleteById(data: FortestDocument): Promise<{ affected?: number }> {
    const { ref: id } = data.toJSON<FortestInterface>();
    return this.fortestRepository.deleteById(id);
  }

  updateById(data: FortestDocument): Promise<{ affected?: number }> {
    const { ref: id, ...rest } = data.toJSON<FortestInterface>();
    return this.fortestRepository.updateById(id, { id, ...rest });
  }
}
