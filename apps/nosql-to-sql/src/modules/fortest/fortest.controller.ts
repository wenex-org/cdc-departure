import { LoggerInterceptor, ParseInterceptor } from '@app/common/interceptors';
import { Controller, UseInterceptors, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { ValidationPipe } from '@app/common/pipes';

import { FortestService } from './fortest.service';

@Controller()
@UsePipes(ValidationPipe)
@UseInterceptors(LoggerInterceptor, ParseInterceptor, new SentryInterceptor())
export class FortestController {
  constructor(private readonly fortestService: FortestService) {}

  @MessagePattern('mongo.wenex.fortests')
  fortest(@Payload() { payload }: any) {
    return this.fortestService.migrate(payload);
  }
}
