import { Knex } from 'knex';

exports.up = async function (knex: Knex)  {
  await knex.schema.dropTableIfExists('services');
}

exports.down = async function (knex: Knex)  {
}
