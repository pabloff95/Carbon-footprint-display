import { NestFactory } from '@nestjs/core';

import { APIModule } from './modules/api.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APIModule);
  app.enableCors();
  await app.listen(3000);
}

bootstrap();
