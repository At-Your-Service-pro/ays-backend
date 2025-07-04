
/** @type {import('knex').Knex} */
exports.up =  function (knex)  {
    return knex.schema.table('services',(table) => {
        table.integer('category_id');
        table
            .foreign('category_id') // Define it as a foreign key
            .references('id') // Reference the 'id' column
            .inTable('category') // Specify the parent table
            .onDelete('CASCADE') // Delete services if the category is deleted
            .onUpdate('CASCADE') // Update category_id if the referenced id changes
    })
}

/** @type {import('knex').Knex} */
exports.down = function (knex)  {
    return knex.schema.table('services', (table) => {
        table.dropColumn('category_id');
    })
}

