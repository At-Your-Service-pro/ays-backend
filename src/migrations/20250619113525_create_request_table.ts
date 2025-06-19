import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('requests',(table) => {
        table.increments('id').primary(),
        table.string('userId').notNullable(),
        table.string('brandname').notNullable(),
        table.string('service').notNullable(),
        table.string('price').notNullable(),
        table.string('location').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('requests')
}

