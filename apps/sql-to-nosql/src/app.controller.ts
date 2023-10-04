import { Controller, Get } from '@nestjs/common';
import { SqlToNosqlService } from './sql-to-nosql.service';

@Controller()
export class SqlToNosqlController {
  constructor(private readonly sqlToNosqlService: SqlToNosqlService) {}

  @Get()
  getHello(): string {
    return this.sqlToNosqlService.getHello();
  }
}
