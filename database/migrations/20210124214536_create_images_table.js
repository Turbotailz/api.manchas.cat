
exports.up = function(knex) {
  return knex.schema.createTable('images', table => {
    table.increments();
    table.string('caption');
    table.string('source').notNullable();
    table.timestamp('taken_at');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('images');
};
