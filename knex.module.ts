import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Knex from 'knex';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'KnexConnection',
      useFactory: async (configService: ConfigService) => {
        const knex = Knex({
          client: 'pg',
          connection: configService.get<string>('DATABASE_URL'),
        });
        return knex;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['KnexConnection'],
})
export class KnexModule {}
