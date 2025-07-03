import type { Knex } from "knex";


exports.up = async function (knex: Knex)  {
    return knex.schema.createTable('requests',(table) => {
        table.increments('id').primary(),
        table.string('userId').notNullable(),
        table.string('brandname').notNullable(),
        table.string('service').notNullable(),
        table.string('price').notNullable(),
        table.string('location').notNullable()
    })
}

exports.down = async function (knex: Knex)  {
    return knex.schema.dropTable('requests')
}

