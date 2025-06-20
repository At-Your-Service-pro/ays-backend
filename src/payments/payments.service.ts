import { Injectable,Inject } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class PaymentsService {
    constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

    async get () {
        const payments = await this.knex('payments').select('*').orderBy('created_at', 'desc')
                                                            
        return {
            statusCode: 200,
            payments
        }
    }

}
