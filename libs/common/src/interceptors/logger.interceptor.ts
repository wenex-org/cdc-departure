import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { type Observable } from 'rxjs';

import { date, logger } from '../utils';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly log = logger(LoggerInterceptor.name);

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const message = context.switchToRpc().getContext<KafkaContext>().getMessage();

    this.log.get(this.intercept.name).info(date(`message received.`));

    this.log
      .get(this.intercept.name)
      .debug(date(`message received with data %j`), message);

    return next.handle();
  }
}
