import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable('requests',(table) => {
        table.string('status').defaultTo('pending').notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.alterTable('requests',(table) => {
        table.string('status').defaultTo('pending').notNullable();
    })
}

