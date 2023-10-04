import { Transport } from '@nestjs/microservices';

export type Check = 'disk' | 'memory' | 'mongo' | 'redis' | 'micro' | 'kafka';

export type HealthCheckOptions = (
  | {
      [key in Check]?:
        | {
            key?: string;
            options?: any;
            transport?: Transport; // micro
          }
        | undefined
        | null;
    }
  | Check
)[];
