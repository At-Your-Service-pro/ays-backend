import { Knex } from 'knex';

exports.up = async function (knex: Knex)  {
  await knex.schema.alterTable('servicesproviders', (table) => {
    table.string('reasonfordecline').defaultTo(''); 
  });
}

exports.down = async function (knex: Knex)  {
  await knex.schema.alterTable('servicesproviders', (table) => {
    table.string('reasonfordecline')
  });
}
