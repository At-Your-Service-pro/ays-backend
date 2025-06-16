import type { Knex } from "knex";


export async function up(knex: Knex) {
  return knex.schema.alterTable('servicesproviders', (table) => {
    table.dropColumn('password'); // Replace with your actual column
  });
}

export async function down(knex: Knex) {
  return knex.schema.alterTable('servicesproviders', (table) => {
    // Rollback: re-add the column (modify as needed)
    table.string('password'); // Adjust type based on original definition
  });
}