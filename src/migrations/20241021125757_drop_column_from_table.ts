import type { Knex } from "knex";


exports.up = function(knex) {
    return knex.schema.table('users', function(table) {
      table.dropColumn('token'); // Replace 'column_name' with the actual column name you want to drop
    });
  };

export async function down(knex: Knex): Promise<void> {
}

