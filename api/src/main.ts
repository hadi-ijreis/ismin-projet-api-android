import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CrousModule } from './crous.module';

async function bootstrap() {
  const app = await NestFactory.create(CrousModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
