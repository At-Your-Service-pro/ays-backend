import type { Knex } from "knex";


exports.up = async function (knex: Knex) {
    return knex.schema.table('services', (table) => {
      table.integer('service_provider_id').unsigned().notNullable(); // Add foreign key column
      table
        .foreign('service_provider_id') // Define it as a foreign key
        .references('id') // Reference the `id` column
        .inTable('services-providers') // In the `service_providers` table
        .onDelete('CASCADE') // Optional: Delete services if the provider is deleted
        .onUpdate('CASCADE'); // Optional: Update foreign key on provider changes
    });
  };
  
exports.down = async function (knex: Knex)  {
    return knex.schema.table('services', (table) => {
      table.dropForeign(['service_provider_id']); // Drop the foreign key
      table.dropColumn('service_provider_id'); // Drop the column
    });
  };
  
