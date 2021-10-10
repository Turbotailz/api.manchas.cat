
exports.up = function(knex) {
  return knex.schema.createTable('images', table => {
    table.string('id').primary().notNullable();
    table.string('source_small').notNullable();
    table.string('source_medium').notNullable();
    table.string('source_large').notNullable();
    table.timestamp('taken_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('images');
};
