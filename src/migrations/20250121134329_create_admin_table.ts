
/** @type {import('knex').Knex} */
exports.up = function (knex) {
    return knex.schema.createTable('admin', (table) => {
      table.increments('id').primary(); // Primary key
      table.string('email').notNullable().unique(); // Email column
      table.string('password').notNullable(); // Password column
      table.string('admin_key').notNullable(); // Admin key column
      table.string('role').defaultTo('admin'); // Role column with default value
      table.string('firstname').notNullable(); // First name column
      table.string('lastname').notNullable(); // Last name column
      table.timestamps(true, true); // Created at and Updated at columns
    });
  };
  
exports.down =  function (knex) {
    return knex.schema.dropTableIfExists('admin'); // Rollback: Drop the table
  };
  
