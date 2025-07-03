
/** @type {import('knex').Knex} */
exports.up = async function (knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.string('username', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.timestamps(true, true); // Adds created_at and updated_at columns
    });
  };
  
/** @type {import('knex').Knex} */
exports.down = async function (knex)  {
    return knex.schema.dropTable('users');
  };
  

