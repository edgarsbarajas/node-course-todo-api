const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10
};

var token = jwt.sign(data, '123abc');
console.log('token: ', token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded: ', decoded);

// jwt.verify();

// var message = 'I am user number 3.';
// var hash = SHA256(message).toString();
//
// console.log('Message: \n', message);
// console.log('Hash: \n', hash);

// var data = {
//   id: 4
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'SOME SECRET').toString()
// }
// //
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data.id)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'SOME SECRET').toString();
//
// if(resultHash === token.hash){
//   console.log('Data was not changed');
// } else {
//   console.log('Data was changed. Don\'t trust!');
// }
