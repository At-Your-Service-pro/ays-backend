import { Module } from '@nestjs/common';
import { ServiceController } from './servicess.controller';
import { ServiceService } from './servicess.service';
import { AppModule } from '../app.module';

@Module({
  imports: [AppModule],
  controllers: [ServiceController],
  providers: [ServiceService],
})
export class ServiceModule {}
