const express = require("express");
const route = express.Router();

const userController = require('../controller/userController');

route.get('/', userController.getAllUsers);

route.post('/register', userController.registerUser);

route.get('/:userId', userController.getUser);

route.post('/login', userController.loginUser);

route.delete('/:userId', userController.deleteUser);

module.exports = route;