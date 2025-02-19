import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable("admin", (table) => {
    table.string("token").nullable(); // Adding a new column
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable("admin", (table) => {
    table.dropColumn("token"); // Rollback in case of migration rollback
  });
}
