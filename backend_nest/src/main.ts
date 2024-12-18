import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
  console.log('server is running at PORT ', PORT);
}

bootstrap();
