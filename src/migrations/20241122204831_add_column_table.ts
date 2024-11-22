import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('users',(table) =>{
        table.string('role').defaultTo('user');
    })

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('users',(table) => {
        table.dropColumn('role');
    })
}

