/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('user', function (table) {
        table.increments('id');
        table.string('DODID');
        table.string('l_name');
        table.string('f_name');
        table.string('username');
        table.string('password')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('user');
};
