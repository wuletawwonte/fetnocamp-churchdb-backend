const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    message: "This is user root end point",
  });
};

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
        password: hash
      });

      user.save();
      res.status(200).json({
        message: "User added successfully",
        data: user,
      });
    }
  });
};
