// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/ToDoApp", { useNewUrlParser: true }, (error, client) => {
  if(error){
    return onsole.log('error!*****:\n', error);
  }
  console.log('Connected to MongoDB server.');

  const db = client.db('TodoApp');

  // findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5b91f31edffb4be68527525f')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });

  db.collection('Users').findOneAndUpdate(
    {
      _id: new ObjectID('5b8f4329da9db705f759f06b')
    },
    {
      $set: {
        name: 'Jowin'
      },
      $inc: {
        age: 48
      }
    },
    {
      returnOriginal: false
    }
  ).then((result) => {
    console.log(result);
  })

  // client.close();
})
