import type { Knex } from "knex";


exports.up = function(knex) {
    return knex.schema.table('users', function(table) {
      table.string('token'); // Replace 'column_name' with the actual column name you want to drop
    });
  };

exports.down = function(knex) {
    return knex.schema.table('users', function(table) {
      table.dropColumn('token'); // Replace 'column_name' with the actual column name you want to drop
    });
  
};  
