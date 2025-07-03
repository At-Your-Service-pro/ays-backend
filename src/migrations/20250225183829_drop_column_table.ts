
/** @type {import('knex').Knex} */
exports.up = function (knex)  {
    return knex.schema.table('users',(table) => {
        table.dropColumn('token');
    })
}

/** @type {import('knex').Knex} */
exports.down = function (knex)  {
    return knex.schema.table('users',(table) => {
        table.string('users');
    })
}

