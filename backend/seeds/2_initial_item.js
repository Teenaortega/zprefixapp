/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {

  return knex('item').del()
  .then(function () {
    // Inserts seed entries
    return knex('item').insert([
    {id: 1, item_name: 'toilet paper', description: 'this is toilet paper', quantity: '100', user_id: 1},
    { id: 2, item_name: 'pens', description: 'this is a pen', quantity: '2000', user_id: 2},
    { id: 3, item_name: 'paper', description: 'this is paper', quantity: '250', user_id: 3},
  ]);
})
};