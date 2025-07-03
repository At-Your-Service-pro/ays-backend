import { Knex } from "knex";

exports.up = async function (knex: Knex)  {
  await knex.schema.alterTable("admin", (table) => {
    table.string("token").nullable(); // Adding a new column
  });
}

exports.down = async function (knex: Knex)  {
  await knex.schema.alterTable("admin", (table) => {
    table.dropColumn("token"); // Rollback in case of migration rollback
  });
}
