

/** @type {import('knex').Knex} */
exports.up = function (knex)  {
  knex.schema.alterTable("admin", (table) => {
    table.string("token").nullable(); // Adding a new column
  });
}

/** @type {import('knex').Knex} */
exports.down = function (knex)  {
  knex.schema.alterTable("admin", (table) => {
    table.dropColumn("token"); // Rollback in case of migration rollback
  });
}
