import type { Knex } from "knex";


exports.up = function(knex) {
    return knex.schema.table('users', (table) => {
      table.string('phonenumber').notNullable; // Adds a new column 'date_of_birth' of type DATE
    });
  };

exports.down = function(knex) {
    return knex.schema.table('users', (table) => {
      table.dropColumn('phonenumber'); // Drops the 'date_of_birth' column
    });
  };
