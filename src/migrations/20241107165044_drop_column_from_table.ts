import type { Knex } from "knex";


exports.up = async function (knex: Knex) {
    return knex.schema.table('users', function (table) {
      table.dropColumn('username');
    });
  };
  
exports.down = async function (knex: Knex)  {
    return knex.schema.table('users', function (table) {
      table.string('username'); // Define the column type to re-add it if rolled back
    });
  };
