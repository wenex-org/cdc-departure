/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
require('log-node')();

import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_CONFIG } from '@app/common/configs';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      subscribe: { fromBeginning: true },
      client: {
        brokers: [KAFKA_CONFIG()],
        clientId: 'example-client-001',
      },
      consumer: { groupId: 'example-consumer-group-001' },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3001);

  const url = await app.getUrl();
  console.log(`Prometheus is running on ${url}/metrics`);
  console.log(`Health check is running on ${url}/status`);
  console.log(`Immigrate Application Started Successfully.`);
}
bootstrap();
