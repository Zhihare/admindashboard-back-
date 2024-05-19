import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('port');
  console.log(port);
  app.useGlobalPipes(new ValidationPipe());
  app.use(express.json());
  app.use(cors());
  await app.listen(3000);
}
bootstrap();
