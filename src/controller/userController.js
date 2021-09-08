const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.getAllUsers = (req, res) => {
  User.find()
    .exec()
    .then((docs) => {
      res.status(200).json({
        data: docs,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.getUser = (req, res) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then((doc) => {
      res.status(200).json({
        data: doc,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.registerUser = (req, res, next) => {
  User.find({ username: req.body.username })
    .then((user) => {
      if (user.length >= 1) {
        console.log("User Already Exists");
        res.status(409).json({
          message: "User already exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              message: err,
            });
          } else {
            const user = new User({
              _id: mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash,
            });

            user
              .save()
              .then(() => {
                res.status(200).json({
                  message: "User added successfully",
                  data: user,
                });
              })
              .catch((err) => {
                res.status(500).json({
                  message: "Internal Server Error: " + err,
                });
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log("Internal Server Error: " + err);
      res.status(500).json({
        message: "Internal Server Error: " + err,
      });
    });
};
