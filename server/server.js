var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {ToDo} = require('./models/todo');
var {User} = require('./models/user')

var app = express();
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id', (req, res) => {
  console.log('aaa');
  var {id} = req.params;
  console.log(id);

  if(!ObjectID.isValid(id)){
    console.log('bbb');
    return res.status(404).send();
  }

  ToDo.findByIdAndDelete(id).then((todo) => {
    if(!todo){
      console.log('a');
      return res.status(404).send();
    }

    console.log('b');
    res.send({todo});
  }, (error) => {
    console.log('c');
    res.status(400).send({ Error: 'Bad request' })
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}.`);
});

module.exports = {
  app
};
