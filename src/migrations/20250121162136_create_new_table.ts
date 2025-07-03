import type { Knex } from "knex";


exports.up = async function (knex: Knex)  {
    return knex.schema.createTable('services-providers',(table) => {
        table.increments('id').primary();
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('supscription-status').notNullable();
        table.timestamps(true,true);
    })
}


exports.down = async function (knex: Knex)  {
    return knex.schema.dropTable('services-providers');
}
