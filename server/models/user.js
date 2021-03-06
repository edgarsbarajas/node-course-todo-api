const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs')

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email.'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
    }]
});

// choose what to send when sending back a user as json
UserSchema.methods.toJSON = function(){
  var user = this;
  var userObj = user.toObject();

  return _.pick(userObj, ['_id', 'email'])
};

// Instance methods
UserSchema.methods.generateAuthToken = function(){
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access: access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function(token){
  var user = this;

  return user.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  });
};

// Model methods
UserSchema.statics.findByToken = function(token){
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch(e) {
    return new Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })
};

UserSchema.statics.findByCredentials = function(email, password){
  var User = this;

  return User.findOne({email}).then((user) => {
    if(!user){
      return Promise.reject({error: 'No user was found.'});
    }

      return bcrypt.compare(password, user.password).then((res) => {
        if(res){
          return user;
        } else {
          return Promise.reject({errorBooty: "bootyError"});
        }
      })
  }
);
};

// Functions before saving a user
// Checks if the password changes, so we could hash it
UserSchema.pre('save', function(next){
  var user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

var User = mongoose.model('User', UserSchema);

module.exports = {User};
