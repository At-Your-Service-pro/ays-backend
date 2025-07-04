/** @type {import('knex').Knex} */
exports.up = function (knex)  {
    return knex.schema.createTable('payments',(table) => {
        table.increments('id').primary();
        table.string('amout').notNullable();
        table.date('payment-date').notNullable();
        table.string('status').notNullable();
        table.integer('service_provider_id').unsigned().notNullable(); // Add foreign key column
            table
                .foreign('service_provider_id') // Define it as a foreign key
                .references('id') // Reference the `id` column
                .inTable('services-providers') // In the `service_providers` table
                .onDelete('CASCADE') // Optional: Delete services if the provider is deleted
                .onUpdate('CASCADE'); // Optional: Update foreign key on provider changes
        table.timestamps(true,true);
    })
}

/** @type {import('knex').Knex} */
exports.down = async function (knex) {
    return knex.schema.dropTable('payments');
}