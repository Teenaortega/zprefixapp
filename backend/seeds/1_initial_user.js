/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {

  return knex('user').del()
  .then(function () {
    // Inserts seed entries
    return knex('user').insert([
    { id: 1, DODID: '5467896542', l_name: 'Ortega', f_name: 'Teena', username: 'teenaortega4ever', password: 'youwillneverguess2!' },
    { id: 2, DODID: '8523495128', l_name: 'Dinkley', f_name: 'Velma', username: 'ohnojinkies', password: 'iknowfredlovesdaphne1.'  },
    { id: 3, DODID: '7802540259', l_name: 'Blake', f_name: 'Daphne', username: 'ilovefred', password: 'IreallyloveShaggy3$'  },
  ]);
})
};