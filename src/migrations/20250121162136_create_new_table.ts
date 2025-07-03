/** @type {import('knex').Knex} */
exports.up = function (knex)  {
    return knex.schema.createTable('services-providers',(table) => {
        table.increments('id').primary();
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('supscription-status').notNullable();
        table.timestamps(true,true);
    })
}

/** @type {import('knex').Knex} */
exports.down = function (knex)  {
    return knex.schema.dropTable('services-providers');
}
