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
        return Knex({
          client: 'pg',
          connection: {
            host: configService.get('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            user: configService.get('DB_USER'),
            password: configService.get('DB_PASSWORD'), 
            database: configService.get('DB_NAME'),
            ssl: { rejectUnauthorized: false }  // Required for AWS RDS
          },
          migrations: {
            directory: './src/migrations',
          },
          seeds: {
            directory: './src/seeds',
          }
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['KnexConnection'],
})
export class KnexModule {}