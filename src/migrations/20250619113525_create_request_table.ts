
/** @type {import('knex').Knex} */
exports.up =  function (knex)  {
    return knex.schema.createTable('requests',(table) => {
        table.increments('id').primary(),
        table.string('userId').notNullable(),
        table.string('brandname').notNullable(),
        table.string('service').notNullable(),
        table.string('price').notNullable(),
        table.string('location').notNullable()
    })
}

/** @type {import('knex').Knex} */
exports.down = function (knex)  {
    return knex.schema.dropTable('requests')
}

