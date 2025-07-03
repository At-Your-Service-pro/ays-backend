import type { Knex } from "knex";



exports.up = async function (knex: Knex)  {
    await knex.schema.dropTableIfExists("users");
  }

exports.down = async function (knex: Knex) {
    return knex.schema.dropTableIfExists('users');
}
