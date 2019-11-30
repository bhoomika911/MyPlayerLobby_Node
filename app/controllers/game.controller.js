const Game = require('./../models/game.model.js');
const constants = require('../constants/constant.js');
const mongoose = require('mongoose');

// Create and Save a new game
exports.createGame = (req, res) => {
        const game = new Game({
          title: req.body.title,
          platform: req.body.platform,
          genre: req.body.genre,
          rating: req.body.rating,
          publisher: req.body.publisher,
          release: req.body.release,
          status: req.body.status
        });
  game.save()
    .then(gameData => {
          res.send({
                status : "success",
                code : 200,
                message : "Game added successfully.",
                
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

// get gameList
exports.findAll = (req, res) => {
  Game.find()
        .then(data => {
          if(data == null){
            return res.send(
              {
                status : "failure",
                code : 500,
                message : "Game List not found",
              });
          }else{
            return res.send(
              {
                status : "success...",
                code : 200,
                data : data
              });
          }

        })
        .catch(err => {
          let message = err.message || "Some error occurred while getting the gamelist.";
          return res.send(
            {
              status : "failure",
              code : 500,
              message : message,
            });
        });
};
