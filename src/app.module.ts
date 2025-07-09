import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from './knex.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './category/category.module';
import { ServicesModule } from './services/services.module';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { SubscriptionModule } from './subscription/subscription.module';
import {CookieInterceptor} from './admin-auth/cookie.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core'; 
import { RequestsModule } from './requests/requests.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    KnexModule,  
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    ServicesModule,
    AdminAuthModule,
    SubscriptionModule, 
    RequestsModule,
    PaymentsModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: CookieInterceptor,
  }],
})
export class AppModule {}
