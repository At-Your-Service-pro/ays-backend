import type { Knex } from "knex";


exports.up = async function (knex: Knex)  {
    return knex.schema.table('services',(table) => {
        table.string('category').notNullable()
    })
}

exports.down = async function (knex: Knex)  {
    return knex.schema.table('services', (table) => {
        table.dropColumn('category')
    })
}

