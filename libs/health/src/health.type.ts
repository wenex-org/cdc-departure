export type Check = 'disk' | 'memory' | 'mongo' | 'redis' | 'kafka';

export type HealthCheckOptions = (
  | {
      [key in Check]?:
        | {
            key?: string;
            options?: any;
          }
        | undefined
        | null;
    }
  | Check
)[];
