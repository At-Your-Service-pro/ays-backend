import type { Knex } from "knex";


exports.up = function(knex){
    return knex.schema.table('customers',function(table){
        table.string('fcmToken');
        table.string('token');
    })
}

exports.down = function(knex){
    return knex.schema.table('customers',function(table){
        table.dropColumn('fcmToken');
        table.dropColumn('token');
    })
}
