const mongoose = require('mongoose');

const PlayerSchema = mongoose.Schema({
  name : {
    type : String
  },
  rank : {
    type : Number,
  },
  score : {
    type : Number
  },
  time : {
    type : String
  },
  fvrtGame : {
    type : String,
  },
  gamePlayed : {
    type : String
  },
  status : {
    type : String
  }
});

module.exports = mongoose.model('Player', PlayerSchema);


