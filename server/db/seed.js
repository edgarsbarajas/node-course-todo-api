const {User} = require('../models/user');
const {Todo} = require('../models/todo');

const {ObjectID} = require('mongodb');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    email: 'edgarsbarajas@yahoo.com',
    password: 'newpass1',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
    }]
}, {
  email: 'martin@bgs.com',
  password: 'newpass2'
}]

users.forEach((user) => {
  console.log("SOMETHING");
  new User(user).save().then((u) => {
    console.log(u);
     new Promise.resolve(u);
  }, (error) => {
    console.log(error);
    new Promise.reject(error);
  })

  // newUser.save((error, s) => {
  //   console.log(error, s)
  // });
});
