
/** @type {import('knex').Knex} */
exports.up = async function (knex)  {
    return knex.schema.table('users',(table) =>{
        table.string('role').defaultTo('user');
    })
}

/** @type {import('knex').Knex} */
exports.down = function (knex)  {
    return knex.schema.table('users',(table) => {
        table.dropColumn('role');
    })
}

