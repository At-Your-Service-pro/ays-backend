import type { Knex } from "knex";


exports.up = async function (knex: Knex)  {
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

exports.down = async function (knex: Knex)  {
    return knex.schema.table('services', (table) => {
        table.dropColumn('user id');
    })
}

