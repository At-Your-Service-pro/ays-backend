import type { Knex } from "knex";


exports.up = function(knex){
    return knex.schema.createTable('customers', function(table){
        table.increments('id').primary();
        table.string('firstname').notNullable();
        table.string('lastname').notNullable();
        table.string('email').notNullable().unique(); 
        table.string('password').notNullable().unique();
        table.string('phonenumber').notNullable().unique();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}

exports.down = function(knex){
    return knex.schema.dropTableIfExists('customers');
}

