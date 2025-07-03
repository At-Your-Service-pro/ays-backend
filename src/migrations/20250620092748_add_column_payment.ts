/** @type {import('knex').Knex} */
exports.up = function (knex) {
  return knex.schema.alterTable('payments', (table) => {
    table.string('userId').notNullable();
  });
};

/** @type {import('knex').Knex} */
exports.down = function (knex) {
  return knex.schema.alterTable('payments', (table) => {
    table.dropColumn('userId');
  });
};
