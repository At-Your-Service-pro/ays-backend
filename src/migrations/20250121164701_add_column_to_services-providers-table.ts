
/** @type {import('knex').Knex} */
exports.up = function (knex)  {
    return knex.schema.table('services-providers', (table) => {
      table.integer('subscription_end_date').unsigned().notNullable(); // Add foreign key column
    });
  };
  
/** @type {import('knex').Knex} */
exports.down = function (knex) {
    return knex.schema.table('services-providers', (table) => {
      table.dropColumn('subscription_end_date'); // Drop the column
    });
  };
  
