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

  findAll() {
    
  }

  findOne(id: number) {
   
  }

  remove(id: number) {
    
  }
}
