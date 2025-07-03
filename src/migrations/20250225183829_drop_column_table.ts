import type { Knex } from "knex";


exports.up = async function (knex: Knex)  {
    return knex.schema.table('users',(table) => {
        table.dropColumn('token');
    })
}


exports.down = async function (knex: Knex)  {
    return knex.schema.table('users',(table) => {
        table.string('users');
    })
}

