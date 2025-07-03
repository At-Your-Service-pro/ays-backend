
/** @type {import('knex').Knex} */
exports.up = function (knex)  {
  knex.schema.dropTableIfExists('services');
}

/** @type {import('knex').Knex} */
exports.down = async function (knex)  {
}
