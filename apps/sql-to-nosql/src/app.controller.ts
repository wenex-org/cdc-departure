import { MessagePattern, Payload } from '@nestjs/microservices';
import { Controller, UseInterceptors } from '@nestjs/common';
import { LoggerInterceptor } from '@app/common/interceptors';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';

import { MysqlSourceDto } from './dto';
import { AppService } from './app.service';

@Controller()
@UseInterceptors(LoggerInterceptor, new SentryInterceptor())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('mysql.example.fortest')
  fortest(@Payload() { payload }: MysqlSourceDto) {
    return this.appService.migrate(payload);
  }
}
