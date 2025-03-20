import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('category'); 
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('services-providers', (table) => {
    table.string('category'); 
  });
}
