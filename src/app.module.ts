import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'knex.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ServicesModule } from './services/services.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';

@Module({
  imports: [
    KnexModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    ServicesModule,
    AdminAuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
