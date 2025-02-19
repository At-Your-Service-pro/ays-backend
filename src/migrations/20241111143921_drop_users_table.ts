import type { Knex } from "knex";



export async function up(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users");
  }

exports.down = function(knex){
    return knex.schema.dropTableIfExists('users');
}
