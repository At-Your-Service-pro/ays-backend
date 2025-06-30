import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv'; 
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: '*',
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Origin',  
      'X-Requested-With',
      'Content-Type',
      'Authorization',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], 

  });
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on post ${process.env.PORT}`); 
}
bootstrap();
