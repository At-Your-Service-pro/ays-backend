import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class ServicesService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async createService(
    name: string,
    location: string,
    phonenumber: string,
    address: string,
    services_offered: { service_name: string; service_price: string }[],
    description: string,
    images: string[],
    category_id: number,
    user_id: number,
    profile_image: string
  ) {
    return this.knex('services')
      .insert({
        name,
        location,
        phonenumber,
        address,
        services_offered: JSON.stringify(services_offered), // Convert to JSON string for storage in a JSONB column
        description,
        images: JSON.stringify(images), // Convert to JSON string for storage
        category_id,
        user_id,
        profile_image

      })
      .returning('*');
  }
  

  async getAllServices() {
    return this.knex('services')
                  .select('*')
                  .orderBy('created_at', 'desc') // Order by the most recent entries
                  .limit(5);
  }

  async getServiceById(id: number) {
    return this.knex('services').where({ id }).first();
  }

  async getServicesByCategory(categoryId: number) {
    return this.knex('services').where({ category_id: categoryId });
  }

  async updateService(id: number, data: any) {
    return this.knex('services').where({ id }).update(data).returning('*');
  }

  async deleteService(id: number) {
    return this.knex('services').where({ id }).del();
  }
}