import { Module, Global } from '@nestjs/common';
import * as Knex from 'knex';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: 'KnexConnection',
      useFactory: async (configService: ConfigService) => {
        const knexConfig = require('../knexfile');
        const knex = Knex(knexConfig);
        return knex;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['KnexConnection'],
})
export class KnexModule {}
