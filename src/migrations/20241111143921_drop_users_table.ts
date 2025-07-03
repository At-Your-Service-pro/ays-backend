
/** @type {import('knex').Knex} */
exports.up = async function (knex)  {
    await knex.schema.dropTableIfExists("users");
}

/** @type {import('knex').Knex} */
exports.down = async function (knex) {
    return knex.schema.dropTableIfExists('users');
}
