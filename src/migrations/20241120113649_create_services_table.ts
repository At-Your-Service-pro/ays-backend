import type { Knex } from "knex";


exports.up = async function (knex: Knex)  {
    return knex.schema.createTable('services', (table) => {
        table.increments('id').primary(),
        table.string('name').notNullable();
        table.string('location').notNullable();
        table.string('phonenumber').notNullable();
        table.string('address').notNullable();
        table.jsonb('services_offered').notNullable(); // JSON array for services and pricing
        table.text('description').notNullable();
        table.jsonb('images').defaultTo('[]'); // JSON array for images
        table.timestamps(true, true);
    })
}


exports.down = async function (knex: Knex) {
    return knex.schema.dropTable('services');
}

