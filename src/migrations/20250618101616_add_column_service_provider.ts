import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('servicesproviders', (table) => {
    table.string('reasonfordecline').defaultTo(''); 
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('servicesproviders', (table) => {
    table.string('reasonfordecline')
  });
}
