import type { Knex } from "knex";


exports.up = async function (knex: Knex) {
  return knex.schema.alterTable('servicesproviders', (table) => {
    table.dropColumn('password'); // Replace with your actual column
  });
}

exports.down = async function (knex: Knex)  {
  return knex.schema.alterTable('servicesproviders', (table) => {
    // Rollback: re-add the column (modify as needed)
    table.string('password'); // Adjust type based on original definition
  });
}