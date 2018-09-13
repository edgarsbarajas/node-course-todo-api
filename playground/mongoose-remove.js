const mongoose = require('../server/db/mongoose');
const {ToDo} = require('../server/models/todo');

// removes all that match
// this will remove all documents in this collection
ToDo.findByIdAndDelete('5b99d9a38fe3c033215a5b4b').then((results) => {
  console.log(results);
}, (error) => {
  console.log('*****Error******\n', error);
});

// findOneAndDelete - deletes one with match, returns the document
// findByIdAndDelete - deletes one with id match, returns the document
// deleteOne - deletes one, no doc return
// deleteMany - delete all that match and do not return the document
