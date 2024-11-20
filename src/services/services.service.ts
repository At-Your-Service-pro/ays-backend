import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class ServiceService {
  constructor(@Inject('KNEX_CONNECTION') private readonly knex: Knex) {}

  async createService(data: any) {
    return this.knex('services').insert(data).returning('*');
  }

  async getAllServices() {
    return this.knex('services').select('*');
  }

  async getServiceById(id: number) {
    return this.knex('services').where({ id }).first();
  }

  async updateService(id: number, data: any) {
    return this.knex('services').where({ id }).update(data).returning('*');
  }

  async deleteService(id: number) {
    return this.knex('services').where({ id }).del();
  }
}
