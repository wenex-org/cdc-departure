import { Controller, UseInterceptors, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoggerInterceptor } from '@app/common/interceptors';
import { SentryInterceptor } from '@ntegral/nestjs-sentry';
import { ValidationPipe } from '@app/common/pipes';

import { MysqlSourceDto } from './dto';
import { AppService } from './app.service';

@Controller()
@UsePipes(ValidationPipe)
@UseInterceptors(LoggerInterceptor, new SentryInterceptor())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('mysql.example.fortest')
  fortest(@Payload() { payload }: MysqlSourceDto) {
    return this.appService.migrate(payload);
  }
}
