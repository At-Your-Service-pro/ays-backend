import { Injectable,Inject} from '@nestjs/common';
import { Knex } from 'knex';
@Injectable()
export class RequestsService {
  constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

  async create(
    userId: string,
    brandname: string,
    service: string,
    price: string,
    location: string) {
    const request = await this.knex('requests')
                               .insert({
                                userId,
                                brandname,
                                service,
                                price,
                                location
                               }).returning('*')
    return {
        statusCode: 200,
        request
      }
   
  }

  async findAll() {
    const requests = await this.knex('requests')
                  .select('*')
                  .orderBy('id', 'desc')
    return {
        statusCode: 200,
        requests
    }              
  }

  async findOne(id: number) {
    const request = await this.knex('requests').where({ id }).first();
    return {
      statusCode: 200, 
      request
    }
  }

  async remove(id: number) {
    await this.knex('requests').where({ id }).del();
    return {
      statusCode: 200,
      message: 'requests deleted successfully'
    }
  }
}
