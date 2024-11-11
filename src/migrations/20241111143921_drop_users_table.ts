import type { Knex } from "knex";


exports.up = function(knex){
    return ;
}

exports.down = function(knex){
    return knex.schema.dropTableIfExists('users');
}
