import { Injectable,Inject } from '@nestjs/common';
import { Knex } from 'knex';
import { categoryDto } from './category.dto';

@Injectable()
export class CategoryService {
    constructor(@Inject('KnexConnection') private readonly knex: Knex) {}

    async create(data: categoryDto) {
        const {name,description} = data;
        await this.knex('categories').insert({name, description});

        return {
            statusCode: 201,
            message: 'Category created successfully'
        }
    }

    async getAll() {
        const categories = await this.knex('categories').select('*');
        if(!categories) return {statusCode: 404, message: 'Categories not found'};
        return {statusCode: 200, data: categories};
    }
}
