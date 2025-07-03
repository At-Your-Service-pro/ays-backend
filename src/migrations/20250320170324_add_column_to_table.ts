
/** @type {import('knex').Knex} */
exports.up = async function (knex)  {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('location'); 
  });
}

/** @type {import('knex').Knex} */
exports.down =  function (knex)  {
  knex.schema.alterTable('services-providers', (table) => {
    table.dropColumn('location')
  });
}
