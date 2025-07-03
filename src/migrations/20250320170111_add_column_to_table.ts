/** @type {import('knex').Knex} */
exports.up = async function (knex)  {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('status').defaultTo('pending'); 
  });
}

/** @type {import('knex').Knex} */
exports.down =  function (knex)  {
  knex.schema.alterTable('services-providers', (table) => {
    table.string('status').defaultTo('pending');
  });
}
