import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Fortest, FortestEntity } from './entity';

@Injectable()
export class FortestRepository {
  constructor(
    @InjectRepository(Fortest) readonly fortestRepository: Repository<Fortest>,
  ) {}

  create(data: FortestEntity) {
    return this.fortestRepository.save(data);
  }

  deleteById(id: number) {
    return this.fortestRepository.delete({ id });
  }

  updateById(id: number, data: FortestEntity) {
    return this.fortestRepository.update({ id }, data);
  }
}
