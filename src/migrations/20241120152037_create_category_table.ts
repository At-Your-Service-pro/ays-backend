import type { Knex } from "knex";


exports.up = async function (knex: Knex)  {
    return knex.schema.createTable('category',(table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true,true);
    })
}


exports.down = async function (knex: Knex)  {
    return knex.schema.dropTable('category');
}

