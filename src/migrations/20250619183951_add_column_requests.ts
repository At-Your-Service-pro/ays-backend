
/** @type {import('knex').Knex} */
exports.up =  function (knex)  {
    knex.schema.alterTable('requests',(table) => {
        table.string('firstname').notNullable()
        table.string('lastname').notNullable()
    })
}

/** @type {import('knex').Knex} */
exports.down = function (knex)  {
    knex.schema.alterTable('requests',(table) => {
        table.dropColumn('firstname')
        table.dropColumn('lastname')
    })
}

