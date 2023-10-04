import { Deserializer, KafkaHeaders } from '@nestjs/microservices';

export const isUndefined = (obj: any): obj is undefined => typeof obj === 'undefined';

export const deserializer: Deserializer = {
  deserialize({ key, value, headers }) {
    const id = headers[KafkaHeaders.CORRELATION_ID].toString();
    if (!isUndefined(headers[KafkaHeaders.NEST_ERR])) {
      return {
        id,
        err: headers[KafkaHeaders.NEST_ERR],
        isDisposed: true,
      };
    }

    if (!isUndefined(headers[KafkaHeaders.NEST_IS_DISPOSED])) {
      return {
        id,
        response: { key, value, headers },
        isDisposed: true,
      };
    }

    return {
      id,
      response: { key, value, headers },
      isDisposed: false,
    };
  },
};
