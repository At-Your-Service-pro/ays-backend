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
    phonenumber: string,
    brandname: string,
    description: string,
    category: number,
    location: string,
    images: string[],
    services: { name: string; price: string }[],
  ) {
    const data = await this.knex('servicesproviders')
      .insert({
        firstname,
        lastname,
        email,
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
  const {
        firstname,
        lastname,
        email,
        phonenumber,
        brandname,
        description,
        category,
        location,
        images,
        services
      } = data

  const provider = await this.knex('servicesproviders')
    .where({ id })
    .update({
        firstname,
        lastname,
        email,
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
    provider, 
  };
}

async approveServiceProvider(id: number) {
   const provider = await this.knex('servicesproviders')
    .where({ id })
    .update({
       status: 'approved'
      })
    .returning('*'); 

  return {
    statusCode: 200,
    provider, 
  };
}

async declineServiceProvider(id: number) {
   const provider = await this.knex('servicesproviders')
    .where({ id })
    .update({
       status: 'decline'
      })
    .returning('*'); 

  return {
    statusCode: 200,
    provider, 
  };
}
  async deleteService(id: number) {
    await this.knex('servicesproviders').where({ id }).del();
    return {
      statusCode: 200,
      message: 'service provider deleted successfully'
    }
  }
}