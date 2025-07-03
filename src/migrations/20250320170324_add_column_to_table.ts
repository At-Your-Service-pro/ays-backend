import { Knex } from 'knex';

exports.up = async function (knex: Knex)  {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('location'); 
  });
}

exports.down = async function (knex: Knex)  {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('location')
  });
}
