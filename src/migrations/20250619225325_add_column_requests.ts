
/** @type {import('knex').Knex} */
exports.up = function (knex)  {
    return knex.schema.alterTable('requests',(table) => {
        table.string('status').defaultTo('pending').notNullable();
    })
}

/** @type {import('knex').Knex} */
exports.down =  function (knex) {
    return knex.schema.alterTable('requests',(table) => {
        table.dropColumn('status');
    })
}

