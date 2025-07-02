import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express'; 
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv'; 
dotenv.config();

async function bootstrap() {
   const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // Trust the proxy (Nginx)
  app.set('trust proxy', true);
  
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
    allowedHeaders: [
      'Access-Control-Allow-Origin',  
      'X-Requested-With',
      'Content-Type',
      'Authorization',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], 

  });
  const port = process.env.PORT || 3104;
  await app.listen(port, '0.0.0.0'); // Listen on all interfaces
  
  Logger.log(`🚀 Application running on port ${port}`, 'Bootstrap');
  Logger.log(`🔁 Nginx proxy at http://localhost`, 'Docker');
  console.log(`Server running on post ${process.env.PORT}`); 
}
bootstrap();
