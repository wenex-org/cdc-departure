import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { type Observable } from 'rxjs';

import { date, logger, toJSON } from '../utils';

@Injectable()
export class ParseInterceptor implements NestInterceptor {
  private readonly log = logger(ParseInterceptor.name);

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const message = context.switchToRpc().getContext().getMessage();

    const key = toJSON(String(message.key)?.match(/[{[\s*]".*("\s*:\s*").*"[\s*}\]]/)[0]);
    this.log.get(this.intercept.name).info(date(`message received with id %j.`), key);

    const payload = message.value?.payload;

    if (payload) {
      Object.assign(payload, key);
      Object.assign(payload, {
        after: toJSON(payload?.after),
        before: toJSON(payload?.before),
      });
    }

    this.log.get(this.intercept.name).debug(date(`payload parsed into %j`), payload);

    return next.handle();
  }
}
