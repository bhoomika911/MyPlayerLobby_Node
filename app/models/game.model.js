const mongoose = require('mongoose');

const GameSchema = mongoose.Schema({
  title : {
    type : String
  },
  platform : {
    type : String,
  },
  genre : {
    type : String
  },
  rating : {
    type : Number
  },
  publisher : {
    type : String,
  },
  release : {
    type : String
  },
  status : {
    type : String
  }
});

module.exports = mongoose.model('Game', GameSchema);



// db.Game.insert({title: "Cricket",platform : "p1",genre : "g1",rating: 1,publisher : "p1",release : "2017",status :"active"})
// db.Game.insert({title: "Foot ball",platform : "p2",genre : "g2",rating: 3,publisher : "p2",release : "2018",status :"active"})
// db.Game.insert({title: "Volly ball",platform : "p2",genre : "g2",rating: 3,publisher : "p2",release : "2019",status :"active"})
