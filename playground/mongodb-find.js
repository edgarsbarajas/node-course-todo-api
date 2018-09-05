// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/ToDoApp", { useNewUrlParser: true }, (error, client) => {
  if(error){
    return onsole.log('error!*****:\n', error);
  }
  console.log('Connected to MongoDB server.');

  const db = client.db('TodoApp');

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}.`);
  // }, (error) => {
  //   console.log(error);
  // })

db.collection('Users').find({name: 'Edgar Barajas'}).toArray().then((docs) => {
  console.log(JSON.stringify(docs, undefined, 2));
}, (error) => {
  console.log(error);
})
  // client.close();
})
