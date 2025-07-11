
/** @type {import('knex').Knex} */
exports.up = async function (knex)  {
    return knex.schema.table('services',(table) => {
        table.string('category').notNullable()
    })
}

/** @type {import('knex').Knex} */
exports.down = async function (knex)  {
    return knex.schema.table('services', (table) => {
        table.dropColumn('category')
    })
}

