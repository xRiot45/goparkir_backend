import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { MainModule } from './main.module';

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    cors: {
      origin: '*',
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      allowedHeaders: 'Content-Type,Authorization',
      preflightContinue: false,
    },
  });
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useLogger(logger);
  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
