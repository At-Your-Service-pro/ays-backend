import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
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


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('services');
}

