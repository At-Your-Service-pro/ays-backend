
/** @type {import('knex').Knex} */
exports.up = async function (knex) {
    return knex.schema.table('customers',function(table){
        table.string('fcmToken');
        table.string('token');
    })
}

/** @type {import('knex').Knex} */
exports.down = async function (knex) {
    return knex.schema.table('customers',function(table){
        table.dropColumn('fcmToken');
        table.dropColumn('token');
    })
}
