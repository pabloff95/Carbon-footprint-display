import { NestFactory } from '@nestjs/core';

import { APIModule } from './modules/api.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(APIModule);
  const configService = app.get(ConfigService)
  console.log(configService.get('DATABASE_URL'))
  await app.listen(3000);
}

bootstrap();
