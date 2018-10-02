var {User} = require('../models/user');

var authenticate = (req, res, next) => {
  console.log("AUTH!!!!!!!!!!!!!!!")
  var token = req.header('x-auth');
  console.log(token);

  User.findByToken(token).then((user) => {
    console.log("found token!")
    if(!user){
      console.log("NO USER!");
      return new Promise.reject();
    }

    req.user = user;
    req.token = token;

    next();
  }).catch((error) => {
    res.status(401).send();
  });
};

module.exports = {authenticate};
