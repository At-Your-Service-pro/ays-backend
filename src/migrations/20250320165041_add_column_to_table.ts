/** @type {import('knex').Knex} */
exports.up = async function (knex) {
  knex.schema.alterTable('services-providers', (table) => {
    table.string('brandName'); // Change type accordingly
    table.string('phonenumber'); 
    table.specificType('images', 'TEXT[]').defaultTo('{}');
    table.string('category'); 
    table.jsonb('services').defaultTo('[]'); 

  });
}

/** @type {import('knex').Knex} */
exports.down = function (knex)  {
  knex.schema.alterTable('services-providers', (table) => {
    table.dropColumn('brandName'); // Change type accordingly
    table.dropColumn('phonenumber'); 
    table.dropColumn('images', 'TEXT[]').defaultTo('{}');
    table.dropColumn('categgory');
    table.dropColumn('category'); 
    table.dropColumn('services').defaultTo('[]'); 
  });
}
