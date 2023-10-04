import {
  DiskHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
  MicroserviceHealthIndicatorOptions,
  MongooseHealthIndicator,
  MongoosePingCheckSettings,
} from '@nestjs/terminus';
import { KafkaOptions, RedisOptions, Transport } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';

import { HEALTH_CHECK_OPTIONS } from './health.const';
import { Check, HealthCheckOptions } from './health.type';

@Injectable()
export class HealthService {
  constructor(
    private readonly diskIndicator: DiskHealthIndicator,
    private readonly memoryIndicator: MemoryHealthIndicator,
    private readonly mongoIndicator: MongooseHealthIndicator,
    private readonly microIndicator: MicroserviceHealthIndicator,

    @Inject(HEALTH_CHECK_OPTIONS)
    protected readonly healthCheckOptions: HealthCheckOptions,
  ) {}

  // Public Methods

  public check() {
    const indicators = [];

    ['disk', 'memory', 'mongo', 'redis', 'kafka'].forEach((check: Check) => {
      const exists = this.exists(check);

      if (exists) {
        if (typeof exists === 'string') {
          indicators.push(this[`${check}Status`]());
        } else {
          indicators.push(this[`${check}Status`](exists.key, exists.options as never));
        }
      }
    });

    return indicators.flat();
  }

  // Protected Methods

  protected mongoStatus(key = 'mongo', options?: MongoosePingCheckSettings) {
    return () => this.mongoIndicator.pingCheck(key, options);
  }

  protected memoryStatus(key = 'memory', options = 300 * 1024 * 1024) {
    return [
      () => this.memoryIndicator.checkRSS(`${key}_rss`, options),
      () => this.memoryIndicator.checkHeap(`${key}_heap`, options),
    ];
  }

  protected diskStatus(key = 'disk', options = { thresholdPercent: 0.75, path: '/' }) {
    return () => this.diskIndicator.checkStorage(key, options);
  }

  protected redisStatus(
    key = 'redis',
    options?: MicroserviceHealthIndicatorOptions<RedisOptions>['options'],
  ) {
    return () =>
      this.microIndicator.pingCheck<RedisOptions>(key, {
        transport: Transport.REDIS,
        options,
      });
  }

  protected kafkaStatus(
    key = 'kafka',
    options?: MicroserviceHealthIndicatorOptions<KafkaOptions>['options'],
  ) {
    return () =>
      this.microIndicator.pingCheck<KafkaOptions>(key, {
        transport: Transport.KAFKA,
        options,
      });
  }

  // Private Methods

  private exists(check: Check) {
    if (!this.healthCheckOptions?.length) return false;

    for (const option of this.healthCheckOptions) {
      if (typeof option === 'string') {
        if (option === check) return option;
      } else {
        for (const key of Object.keys(option)) {
          if (key === check) return option[key];
        }
      }
    }

    return false;
  }
}
