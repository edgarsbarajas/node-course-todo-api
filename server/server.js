var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {ToDo} = require('./models/todo');
var {User} = require('./models/user')

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new ToDo({
    text: req.body.text
  });

  todo.save().then((document) => {
    res.send(document);
  }, (error) => {
    res.status(400).send(error);
  });

  console.log(req.body);
});

app.get('/todos', (req, res) => {
  ToDo.find().then((todos) => {
    res.send({
      todos
    });
  }, (error) => {
    res.status(200).send(error);
  });
});

app.get('/todos/:id', (req, res) => {
  var {id} = req.params;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  ToDo.findById(id).then((todo) => {
    if(!todo){
      return res.status(400).send();
    }

    res.status(200).send({todo});
  });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {
  app
};
