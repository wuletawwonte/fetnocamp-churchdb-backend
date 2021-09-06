const mongoose = require('mongoose');
const User = require('../models/user');

exports.getAllUsers = (req, res) => {
  res.status(200).json({
    message: "This is user root end point",
  });
};

exports.registerUser = (req, res) => {
    const user = new User({
        _id: mongoose.Types.ObjectId(),
        username: req.body.username,
        password: req.body.password
    });

    user.save();
    res.status(200).json({
        message: "User added successfully",
        data: user
    })
};
