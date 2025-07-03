import { Knex } from 'knex';

exports.up = async function (knex: Knex)  {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('category'); 
  });
}

exports.down = async function (knex: Knex)  {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('category'); 
  });
}
