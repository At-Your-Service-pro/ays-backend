import { Knex } from 'knex';

exports.up = async function (knex: Knex)  {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('status').defaultTo('pending'); 
  });
}

exports.down = async function (knex: Knex)  {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('status').defaultTo('pending');
  });
}
