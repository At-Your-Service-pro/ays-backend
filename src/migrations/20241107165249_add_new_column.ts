import type { Knex } from "knex";


exports.up = async function (knex: Knex) {
    return knex.schema.table("users", table => {
        table.string("firstname").notNullable();
        table.string("lastname").notNullable();
    });
}

exports.down = async function (knex: Knex) {
    return knex.schema.table("users",function(table) {
        table.dropColumn("firstname");
        table.dropColumn("lastname");
    });
}
