const express = require('express');
const app = express();
const knex = require('knex')(require('../knexfile')["development"]);
const cors = require('cors');
const PORT = 8081;

app.use(cors())
app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

app.get('/', (req, res) => {
    res.send('hello world')
  })

  app.get('/users', function(req, res) {
    knex
      .select('*')
      .from('user')
      .then(data => res.status(200).json(data))
      .catch(() =>
        res.status(404).json({
          message:
            'The data you are looking for could not be found. Please try again'
        })
      );
  });

  app.get('/items', function(req, res) {
    knex
      .select('*')
      .from('item')
      .then(data => res.status(200).json(data))
      .catch(() =>
        res.status(404).json({
          message:
            'The data you are looking for could not be found. Please try again'
        })
      );
  });

  app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    knex('user')
      .where('id', id)
      .select('*')
      .then((user) => {
        // let result = user.map((item) => user);
        res.json(user);
      })
  });

  app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    knex('item')
      .where('id', id)
      .select('*')
      .then((item) => {
        // let result = item.map((item) => item);
        res.json(item);
      })
  });

  app.post('/users', async (req, res) => {
    const maxIdQuery = await knex('user').max('id as maxId').first();
    let num = maxIdQuery.maxId + 1;
    knex('user')
      .insert(
        {
          id: num,
          DODID: req.body.DODID,
          l_name: req.body.l_name,
          f_name: req.body.f_name,
          username: req.body.username,
          password: req.body.password
        }
      )
      .then(function () {
        res.status(201).send('A new user has been added')
      })
  });

  app.post('/items', async (req, res) => {
    const maxIdQuery = await knex('item').max('id as maxId').first();
    let num = maxIdQuery.maxId + 1;
    knex('item')
      .insert(
        {
          id: num,
          item_name: req.body.item_name,
          description: req.body.description,
          quantity: req.body.quantity,
          user_id: req.body.user_id
        }
      )
      .then(function () {
        res.status(201).send('A new item has been added')
      })
  });


  app.post('/multiple-add', async (req, res) => {
    const dataArray = req.body;
  
    const maxIdQuery = await knex('item').max('id as maxId').first();
    let num = Number.parseInt(maxIdQuery.maxId + 1);
    dataArray.map((obj) => {
      obj['id'] = num;
      num++;
    })
    console.log(dataArray);
    knex('item')
      .insert(
        dataArray
      )
      .then(function (result) {
        res.status(201).send(result);
      });
  });

  app.patch('/users/:id', (req, res) => {
    let { id } = req.params;
    console.log('this is the id', id)
    console.log('this is the console log', req.body);
    knex('user')
      .where('id', id)
      .update({
        DODID: req.body.DODID,
        l_name: req.body.l_name,
        f_name: req.body.f_name,
        username: req.body.username,
        password: req.body.password
      })
      .then(members => {
        members === 0 ? res.status(200).send(`Entry ${id} doesn't exist, so nothing was updated`)
          : res.status(201).send(`User ${id} is updated`)
      })
  });

  app.patch('/items/:id', (req, res) => {
    let { id } = req.params;
    console.log('this is the id', id)
    console.log('this is the console log', req.body);
    knex('item')
      .where('id', id)
      .update({
        item_name: req.body.item_name,
        description: req.body.description,
        quantity: req.body.quantity
      })
      .then(items => {
        items === 0 ? res.status(200).send(`Entry ${id} doesn't exist, so nothing was updated`)
          : res.status(201).send(`Item ${id} is updated`)
      })
  });

  app.delete('/multiple-delete/items', async (req, res) => {
    const dataArray = req.body;
    knex('item')
      .whereIn('id', dataArray)
      .del()
      .then(items => {
        items === 0 ? res.status(200).send(`Error: Nothing Was Deleted`)
          : res.status(201).send(`All items were deleted`)
      });
  });

  app.delete('/multiple-delete/users', async (req, res) => {
    const dataArray = req.body;
    knex('users')
      .whereIn('id', dataArray)
      .del()
      .then(users => {
        users === 0 ? res.status(200).send(`Error: Nothing Was Deleted`)
          : res.status(201).send(`All users were deleted`)
      });
  });

  app.delete('/users/:id', async (req, res) => {
    let { id } = req.params;
    // const id = req.body.id;
    knex('user')
      .where('id', id)
      .del()
      .then(user => {
        user === 0 ? res.status(200).send(`Entry ${id} doesn't exist, so nothing was deleted`)
          : res.status(201).send(`Member ${id} was deleted`)
      })
  });
  app.delete('/items/:id', async (req, res) => {
    let { id } = req.params;
    // const id = req.body.id;
    knex('item')
      .where('id', id)
      .del()
      .then(item => {
        item === 0 ? res.status(200).send(`Entry ${id} doesn't exist, so nothing was deleted`)
          : res.status(201).send(`Item ${id} was deleted`)
      })
  });
  

  app.get('*', function (req, res) {
    res.status(404).send(`404: You tried navigating to a path that doesn't exist...`);
  });
  app.post('*', function (req, res) {
    res.status(404).send(`404: You tried posting to a path that doesn't exist...`);
  });
  app.patch('*', function (req, res) {
    res.status(404).send(`404: You tried patching in a path that doesn't exist...`);
  });
  app.delete('*', function (req, res) {
    res.status(404).send(`404: You tried deleting in a path that doesn't exist...`);
  });
  
  module.exports = app;