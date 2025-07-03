/** @type {import('knex').Knex} */
exports.up = function (knex)  {
  knex.schema.alterTable('services-providers', (table) => {
    table.string('category'); 
  });
}

exports.down = function (knex)  {
  knex.schema.alterTable('services-providers', (table) => {
    table.string('category'); 
  });
}
