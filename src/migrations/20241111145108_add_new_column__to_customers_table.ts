import type { Knex } from "knex";


exports.up = async function (knex: Knex) {
    return knex.schema.table('customers',function(table){
        table.string('fcmToken');
        table.string('token');
    })
}

exports.down = async function (knex: Knex) {
    return knex.schema.table('customers',function(table){
        table.dropColumn('fcmToken');
        table.dropColumn('token');
    })
}
