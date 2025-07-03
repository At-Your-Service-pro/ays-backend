
/** @type {import('knex').Knex} */
exports.up = async function (knex) {
    return knex.schema.table("users", table => {
        table.string("firstname").notNullable();
        table.string("lastname").notNullable();
    });
}

/** @type {import('knex').Knex} */
exports.down = async function (knex) {
    return knex.schema.table("users",function(table) {
        table.dropColumn("firstname");
        table.dropColumn("lastname");
    });
}
