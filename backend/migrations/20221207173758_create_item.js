const { default: UserContext } = require("../../frontend/src/components/UserContext");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('item', function (table) {
        table.increments('id');
        table.string('item_name');
        table.string('description');
        table.string('quantity');
        table.integer('user_id');
        table.foreign('user_id').references('user.id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('item');
};
