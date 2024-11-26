import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      'http://localhost:3104'
    ],
    allowedHeaders: [
      'Access-Control-Allow-Origin',
      'X-Requested-With',
      'Content-Type',
      'Authorization',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,

  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on post ${process.env.PORT}`);
}
bootstrap();
