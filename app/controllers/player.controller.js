const Player = require('../models/player.model.js');
const constants = require('../constants/constant.js');
const mongoose = require('mongoose');

// get playerList 
exports.findAll = (req, res) => {
  Player.find()
        .then(data => {
          if(data == null){
            return res.send(
              {
                status : "failure",
                code : 500,
                message : "Player List not found",
              });
          }else{
            return res.send(
              {
                status : "success",
                code : 200,
                data : data
              });
          }

        })
        .catch(err => {
          let message = err.message || "Some error occurred while getting the playerlist.";
          return res.send(
            {
              status : "failure",
              code : 500,
              message : message,
            });
        });
};


// Create and Save a new player
exports.createPlayer = (req, res) => {
        const player = new Player({
          name : req.body.name,
          rank :req.body.rank,
          score : req.body.score,
          time : req.body.time,
          fvrtGame : req.body.fvrtGame,
          gamePlayed :req.body.gamePlayed,
          status : req.body.status
        });
  player.save()
    .then(playerData => {
          res.send({
                status : "success",
                code : 200,
                message : "Player added successfully.",
                
              });
          
      })
    .catch(err => {
          let message = err.message || "Some error occurred while creating the User.";

          return res.send(
            {
              status : "failure",
              code : 500,
              message : message,
            });
        });
};

// delete player
exports.deletePlayer = (req, res) => {
  let playerId = req.params.player_id;

  console.log("player id : "+playerId);
  Player.remove({
    _id: playerId
  })
  .then(data => {
    return res.send(
      {
        status : "success",
        code : 200,
        message : "Player deleted successfully",
      });
  })
  .catch(err => {
    let message = err.message || "Some error occurred while deleting the player.";
    return res.send(
      {
        status : "failure",
        code : 500,
        message : message,
      });
  });
};

// Update  player
exports.updatePlayer = (req, res) => {
   let player_id = req.params.player_id;
    Player.findOneAndUpdate({_id : player_id}, {
      name : req.body.name,
      rank :req.body.rank,
      score : req.body.score,
      time : req.body.time,
      fvrtGame : req.body.fvrtGame,
      gamePlayed :req.body.gamePlayed,
      status : req.body.status
    }, {new: true})
    .then(playerData => {
      return res.send({
          status : "success",
          code : 200,
          message : "player updated successfully.",
        });
    }).catch(err => {
      let message = err.message || "Some error occurred while updating the player.";

      return res.send(
        {
          status : "failure",
          code : 500,
          message : message,
        });
    });
};

