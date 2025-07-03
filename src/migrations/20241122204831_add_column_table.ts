import type { Knex } from "knex";


exports.up = async function (knex: Knex)  {
    return knex.schema.table('users',(table) =>{
        table.string('role').defaultTo('user');
    })

}


exports.down = async function (knex: Knex)  {
    return knex.schema.table('users',(table) => {
        table.dropColumn('role');
    })
}

