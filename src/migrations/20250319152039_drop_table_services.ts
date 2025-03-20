import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('services');
}

export async function down(knex: Knex): Promise<void> {
}
