import { Deserializer } from '@nestjs/microservices';
import * as crypto from 'crypto';

export const deserializer: Deserializer = {
  deserialize({ key, value, headers }) {
    return {
      id: crypto.randomUUID(),
      response: { key, value, headers },
      isDisposed: false,
    };
  },
};
