
/** @type {import('knex').Knex} */
exports.up = function (knex)  {
  knex.schema.alterTable('servicesproviders', (table) => {
    table.string('reasonfordecline').defaultTo(''); 
  });
}

/** @type {import('knex').Knex} */
exports.down = function (knex)  {
  knex.schema.alterTable('servicesproviders', (table) => {
    table.dropColumn('reasonfordecline')
  });
}
