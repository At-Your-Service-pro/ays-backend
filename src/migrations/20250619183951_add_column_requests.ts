import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable('requests',(table) => {
        table.string('firstname').notNullable()
        table.string('lastname').notNullable()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable('requests',(table) => {
        table.string('firstname').notNullable()
        table.string('lastname').notNullable()
    })
}

