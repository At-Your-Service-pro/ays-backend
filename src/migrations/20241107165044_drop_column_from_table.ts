
/** @type {import('knex').Knex} */
exports.up = async function (knex) {
    return knex.schema.table('users', function (table) {
      table.dropColumn('username');
    });
  };
  

/** @type {import('knex').Knex} */  
exports.down = async function (knex)  {
    return knex.schema.table('users', function (table) {
      table.string('username'); // Define the column type to re-add it if rolled back
    });
  };
