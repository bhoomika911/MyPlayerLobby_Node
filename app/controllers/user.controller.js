const User = require('../models/user.model.js');
const constants = require('../constants/constant.js');
const mongoose = require('mongoose');

// get userList 
exports.getAllUsers = (req, res) => {
  User.find()
    .then(data => {
      if (data == null) {
        return res.send(
          {
            status: "failure",
            code: 500,
            message: "User List not found",
          });
      } else {
        return res.send(
          {
            status: "success",
            code: 200,
            data: data
          });
      }

    })
    .catch(err => {
      let message = err.message || "Some error occurred while getting the userlist.";
      return res.send(
        {
          status: "failure",
          code: 500,
          message: message,
        });
    });
};

// userLogin 
exports.userLogin = (req, res) => {
  User.find({
    role: req.body.role,
    userid: req.body.userid,
  })
    .then(data => {
      if (data == "") {
        return res.send(
          {
            status: "failure",
            code: 500,
            message: "User not found",
          });
      } else {
        User.find({
          role: req.body.role,
          userid: req.body.userid,
          password: req.body.password

        })

          .then(data => {
            if (data == "") {
              return res.send(
                {
                  status: "failure",
                  code: 500,
                  message: "Invalid credentials...",
                });
            } else {
              return res.send(
                {
                  status: "success",
                  code: 200,
                  data: "Login successful..."
                });
            }

          })
          .catch(err => {
            let message = err.message || "Some error occurred while getting the userlist.";
            return res.send(
              {
                status: "failure",
                code: 500,
                message: message,
              });
          });
      }

    })
    .catch(err => {
      let message = err.message || "Some error occurred while getting the userlist.";
      return res.send(
        {
          status: "failure",
          code: 500,
          message: message,
        });
    });
};


// Create and Save a new user
exports.addUser = (req, res) => {
  const user = new User({
    role: req.body.role,
    userid: req.body.userid,
    password: req.body.password
  });

  user.save()
    .then(userData => {
      res.send({
        status: "success",
        code: 200,
        message: "User added successfully.",

      });

    })
    .catch(err => {
      let message = err.message || "Some error occurred while creating the User.";

      if (err.code == 11000) {
        message = "User id already exist.";
      }

      return res.send(
        {
          status: "failure",
          code: 500,
          message: message,
        });
    });
};