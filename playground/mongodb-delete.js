// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/ToDoApp", { useNewUrlParser: true }, (error, client) => {
  if(error){
    return onsole.log('error!*****:\n', error);
  }
  console.log('Connected to MongoDB server.');

  const db = client.db('TodoApp');

  // deleteMany - deletes all that fits argument
  // db.collection('Todos').deleteMany({text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // })

  // deleteOne - finds the first instance, deletes it
  // db.collection('Todos').deleteOne({ text: 'eat lunch'}).then((result) => {
  //   console.log(result);
  // })

  // findOneAndDelete - finds one, deletes it, returns the document (cool)
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // })

  // db.collection('Users').deleteMany({name: 'Edgar Barajas'}).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndDelete({_id: new ObjectID('5b8f4329da9db705f759f06b')}).then((result) => {
    console.log(result);
  });
  // client.close();
})
