import { Module } from '@nestjs/common';
import { ServiceController } from './services.controller';
import { ServiceService } from './services.service';
import { AppModule } from '../app.module';

@Module({
  imports: [AppModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
