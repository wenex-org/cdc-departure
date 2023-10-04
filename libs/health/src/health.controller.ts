import { HealthCheckService, HealthCheck } from '@nestjs/terminus';
import { Controller, Get } from '@nestjs/common';

import { HealthService } from './health.service';

@Controller('status')
export class HealthController {
  constructor(
    private readonly health: HealthCheckService,
    private readonly healthService: HealthService,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check(this.healthService.check());
  }
}
