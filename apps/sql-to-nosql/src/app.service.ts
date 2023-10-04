import { date, logger } from '@app/common/utils';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly log = logger(AppService.name);

  migrate(payload: any) {
    this.log
      .get(this.migrate.name)
      .debug(date('migration was started with payload %j'), payload);
  }
}
