import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('brandName'); // Change type accordingly
    table.string('phonenumber'); 
    table.specificType('images', 'TEXT[]').defaultTo('{}');
    table.string('category'); 
    table.jsonb('services').defaultTo('[]'); 

  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('brandName'); // Change type accordingly
    table.string('phonenumber'); 
    table.specificType('images', 'TEXT[]').defaultTo('{}');
    table.string('categgory');
    table.string('category'); 
    table.jsonb('services').defaultTo('[]'); 
  });
}
