const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {ToDo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// var id = '5b9734d4adf652066c8012f911';
//
// console.log(ObjectID.isValid(id));

// ToDo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: \n', todos);
// });
//
// ToDo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo: \n', todo);
// });

// ToDo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('ID not found');
//   }
//   console.log('Todo by ID: \n', todo);
// }).catch((error) => {
//   console.log(error);
// });

User.findById('5b95d62451e04606a0bd6fe3').then((user) => {
  if(!user){
    return console.log('Unable to find user.');
  }

  console.log(JSON.stringify(user, undefined, 2));
}, (error) => {
  console.log(error);
});
