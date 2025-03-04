import type { Knex } from "knex";

exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.string('username', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('users');
  };
  

