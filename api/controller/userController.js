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
          error: err
      })
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
          error: err
      })
    });

}

exports.registerUser = (req, res) => {
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

      user.save();
      res.status(200).json({
        message: "User added successfully",
        data: user,
      });
    }
  });
};
