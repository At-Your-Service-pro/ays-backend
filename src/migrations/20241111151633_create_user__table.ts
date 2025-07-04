/** @type {import('knex').Knex} */
exports.up = async function (knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('firstname').notNullable(); 
        table.string('lastname').notNullable();
        table.string('email').unique().notNullable();
        table.string('password').notNullable().unique();
        table.string('phonenumber').notNullable();
        table.string('fcmToken');
        table.string('token');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

/** @type {import('knex').Knex} */
exports.down = async function (knex) {
    return knex.schema.dropTable('users');
}

