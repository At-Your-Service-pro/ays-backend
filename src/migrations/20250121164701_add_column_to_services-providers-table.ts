import type { Knex } from "knex";


exports.up = async function (knex: Knex)  {
    return knex.schema.table('services-providers', (table) => {
      table.integer('subscription_end_date').unsigned().notNullable(); // Add foreign key column
    });
  };
  
exports.down = async function (knex: Knex) {
    return knex.schema.table('services-providers', (table) => {
      table.dropColumn('subscription_end_date'); // Drop the column
    });
  };
  
