const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  role : {
    type : String
  },
  userid : {
    type: String,
    unique : true
  },
  password : {
    type : String
  },
  
});

module.exports = mongoose.model('User', UserSchema);
