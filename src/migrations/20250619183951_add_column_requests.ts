import type { Knex } from "knex";

exports.up = async function (knex: Knex)  {
    await knex.schema.alterTable('requests',(table) => {
        table.string('firstname').notNullable()
        table.string('lastname').notNullable()
    })
}


exports.down = async function (knex: Knex)  {
    await knex.schema.alterTable('requests',(table) => {
        table.string('firstname').notNullable()
        table.string('lastname').notNullable()
    })
}

