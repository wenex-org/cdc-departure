import { NestFactory } from '@nestjs/core';
import { SqlToNosqlModule } from './sql-to-nosql.module';

async function bootstrap() {
  const app = await NestFactory.create(SqlToNosqlModule);
  await app.listen(3000);
}
bootstrap();
