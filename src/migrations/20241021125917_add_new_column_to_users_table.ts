
/** @type {import('knex').Knex} */
exports.up = async function (knex) {
    return knex.schema.table('users', function(table) {
      table.string('token'); // Replace 'column_name' with the actual column name you want to drop
    });
  };

  
/** @type {import('knex').Knex} */
exports.down = async function (knex) {
    return knex.schema.table('users', function(table) {
      table.dropColumn('token'); // Replace 'column_name' with the actual column name you want to drop
    });
  
};  
