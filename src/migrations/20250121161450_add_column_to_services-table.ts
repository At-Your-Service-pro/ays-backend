import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('services',(table) =>{
        table.string('status');
    })

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.table('services',(table) => {
        table.dropColumn('status');
    })
}
