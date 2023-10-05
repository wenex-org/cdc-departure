import { Controller, UseInterceptors, UsePipes } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { LoggerInterceptor } from '@app/common/interceptors';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { FortestEntity } from '@app/common/entities';
import { ValidationPipe } from '@app/common/pipes';

import { MysqlSourceDto } from './dto';
import { FortestService } from './fortest.service';

@Controller()
@UsePipes(ValidationPipe)
@UseInterceptors(LoggerInterceptor, new SentryInterceptor())
export class FortestController {
  constructor(private readonly fortestService: FortestService) {}

  @EventPattern('mysql.example.fortest')
  fortest(@Payload() { payload }: MysqlSourceDto<FortestEntity>) {
    return this.fortestService.migrate(payload);
  }
}
