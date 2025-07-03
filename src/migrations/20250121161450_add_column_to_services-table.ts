
/** @type {import('knex').Knex} */
exports.up = async function (knex)  {
    return knex.schema.table('services',(table) =>{
        table.string('status');
    })
}

/** @type {import('knex').Knex} */
exports.down = function (knex)  {
    return knex.schema.table('services',(table) => {
        table.dropColumn('status');
    })
}
