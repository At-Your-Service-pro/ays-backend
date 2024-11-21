import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('services', (table) => {
        table.integer('user_id');
        table
            .foreign('user_id') // Define it as a foreign key
            .references('id') // Reference the 'id' column
            .inTable('category') // Specify the parent table
            .onDelete('CASCADE') // Delete services if the user id is deleted
            .onUpdate('CASCADE') // Update user_id if the referenced id changes
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('services', (table) => {
        table.dropColumn('user id');
    })
}

