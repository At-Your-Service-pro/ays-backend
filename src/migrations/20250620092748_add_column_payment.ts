import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return await knex.schema.alterTable('payments',(table) => {
        table.string('userId').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    return await knex.schema.alterTable('payments',(table) => {
        table.string('userId').notNullable()
    })
}

