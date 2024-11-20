import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'knex.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ServicessModule } from './servicess/servicess.module';

@Module({
  imports: [
    KnexModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    ServicessModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
