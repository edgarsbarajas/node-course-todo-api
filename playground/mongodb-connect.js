// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/ToDoApp", { useNewUrlParser: true }, (error, client) => {
  if(error){
    return onsole.log('error!*****:\n', error);
  }
  console.log('Connected to MongoDB server.');

  const db = client.db('TodoApp');

  // db.collection('Todos').insertOne({
  //   name: 'Edgar Barajas',
  //   age: 23,
  //   job: 'Frontend Developer'
  // }, (error, result) => {
  //   if(error){
  //     return console.log('Error inserting document to MongoDB...', error);
  //   }
  //
  //   console.log('Successfully inserted a document.');
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  db.collection('Users').insertOne({
    name: 'Edgar Barajas',
    age: 23,
    location: 'SF'
  }, (error, result) => {
    if(error){
      return console.log('Error inserting document to MongoDB...', error);
    }

    console.log('Successfully inserted a document.');
    console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
  })

  client.close();
})
