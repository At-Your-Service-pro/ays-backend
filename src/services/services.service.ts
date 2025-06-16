import { Inject, Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class ServicesService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async createService(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    phonenumber: string,
    brandname: string,
    description: string,
    category: number,
    location: string,
    images: string[],
    services: { name: string; price: string }[],
  ) {
     const hasedpassword  = await bcryptjs.hash(password, 10);
    const data = await this.knex('servicesproviders')
      .insert({
        firstname,
        lastname,
        email,
        password: hasedpassword,
        phonenumber,
        brandname,
        description,
        category,
        location,
        images: this.knex.raw('ARRAY[?]::TEXT[]', [[images]]),
        services: JSON.stringify(services), // Convert to JSON string for storage in a JSONB column
      })
      .returning('*');  

      return {
        statusCode: 200,
        data
      }
  }
  

  async getAllServices() {
    return this.knex('servicesproviders')
                  .select('*')
                  .orderBy('created_at', 'desc') // Order by the most recent entries
                  .limit(5);
  }

  async getServiceById(id: number) {
    const service = await this.knex('servicesproviders').where({ id }).first();
    const {password,...rest} = service;
    return {
      rest
    }
  }

  async getServicesByCategory(categoryId: number) {
    return this.knex('servicesproviders').where({ category_id: categoryId });
  }

  async updateService(id: number, data: any) {
  const payload = {
    ...data,
    services: JSON.stringify(data.services_offered), 
    images: JSON.stringify(data.images),                     
  };

  const provider = await this.knex('servicesproviders')
    .where({ id })
    .update(payload)
    .returning('*'); 

  return {
    statusCode: 200,
    provider, 
  };
}


  async deleteService(id: number) {
    return this.knex('servicesproviders').where({ id }).del();
  }
}