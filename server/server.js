const env = process.env.NODE_ENV;

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {ToDo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  var todo = new ToDo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((document) => {
    res.send(document);
  }, (error) => {
    res.status(400).send(error);
  });

  console.log(req.body);
});

app.get('/todos', authenticate, (req, res) => {
  ToDo.find({_creator: req.user._id}).then((todos) => {
    res.send({
      todos
    });
  }, (error) => {
    res.status(200).send(error);
  });
});

app.get('/todos/:id', authenticate, (req, res) => {
  var {id} = req.params;

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  ToDo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo){
      return res.status(400).send();
    }

    res.status(200).send({todo});
  });
});

app.delete('/todos/:id', authenticate, (req, res) => {
  console.log('aaa');
  var {id} = req.params;
  console.log(id);

  if(!ObjectID.isValid(id)){
    console.log('bbb');
    return res.status(404).send();
  }

  ToDo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }

    res.send({todo});
  }, (error) => {
    res.status(400).send({ Error: 'Bad request' })
  });
});

app.patch('/todos/:id', authenticate, (req, res) => {
  var id = req.params.id;
  var body = {
    text: req.body.text,
    completed: req.body.completed
  };

  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }

  if(typeof(body.completed) === 'boolean' && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  ToDo.findOneAndUpdate({_id: id, _creator: req.user._id}, { $set: body }, { new: true }).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }, (error) => {
    res.status(400).send();
  });
});

app.post('/users', (req, res) => {
  var {email, password} = req.body;
  var body = {email, password};
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((error) => {
    res.status(400).send(error);
  })
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

// LOGIN
app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    })
  }).catch((error) => {
    res.status(400).send(error);
  });
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400);
  })
})

app.listen(port, () => {
  console.log(`Started up at port ${port}.`);
});

module.exports = {
  app
};
