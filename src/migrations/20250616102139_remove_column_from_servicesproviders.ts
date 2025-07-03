/** @type {import('knex').Knex} */
exports.up = function (knex) {
  return knex.schema.alterTable('servicesproviders', (table) => {
    table.dropColumn('password'); // Replace with your actual column
  });
}

/** @type {import('knex').Knex} */
exports.down = function (knex)  {
  return knex.schema.alterTable('servicesproviders', (table) => {
    // Rollback: re-add the column (modify as needed)
    table.string('password'); // Adjust type based on original definition
  });
}