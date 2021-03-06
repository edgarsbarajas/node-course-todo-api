var {User} = require('../models/user');

var authenticate = (req, res, next) => {
  var token = req.header('x-auth');
  console.log(token);

  User.findByToken(token).then((user) => {
    if(!user){
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
