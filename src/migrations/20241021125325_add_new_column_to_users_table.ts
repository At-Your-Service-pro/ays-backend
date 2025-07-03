
/** @type {import('knex').Knex} */
exports.up = async function (knex) {
    return knex.schema.table('users', (table) => {
      table.string('token').notNullable;
      table.string('fcmToken'); // Adds a new column 'date_of_birth' of type DATE
    });
  };

/** @type {import('knex').Knex} */
exports.down = async function (knex) {
    return knex.schema.table('users', (table) => {
      table.dropColumn('token');
      table.dropColumn('fcmToken'); // Drops the 'date_of_birth' column
    });
  };
