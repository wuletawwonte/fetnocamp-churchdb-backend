const express = require("express");
const route = express.Router();

const userController = require('../controller/userController');

route.get('/', userController.getAllUsers);

route.post('/', userController.registerUser);

route.get('/:userId', userController.getUser);

module.exports = route;