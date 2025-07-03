/** @type {import('knex').Knex} */
exports.up = async function (knex)  {
    return knex.schema.createTable('category',(table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.timestamps(true,true);
    })
}

/** @type {import('knex').Knex} */
exports.down = async function (knex)  {
    return knex.schema.dropTable('category');
}

