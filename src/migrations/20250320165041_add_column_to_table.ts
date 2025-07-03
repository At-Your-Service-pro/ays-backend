import { Knex } from 'knex';

exports.up = async function (knex: Knex) {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('brandName'); // Change type accordingly
    table.string('phonenumber'); 
    table.specificType('images', 'TEXT[]').defaultTo('{}');
    table.string('category'); 
    table.jsonb('services').defaultTo('[]'); 

  });
}

exports.down = async function (knex: Knex)  {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('brandName'); // Change type accordingly
    table.string('phonenumber'); 
    table.specificType('images', 'TEXT[]').defaultTo('{}');
    table.string('categgory');
    table.string('category'); 
    table.jsonb('services').defaultTo('[]'); 
  });
}
