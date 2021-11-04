const express = require("express");
const route = express.Router();

const checkAuth = require('../middleware/auth');
const userController = require('../controller/userController');

route.get('/', userController.getAllUsers);

route.post('/register', userController.registerUser);

route.get('/:userId', checkAuth, userController.getUser);

route.post('/login', userController.loginUser);

route.delete('/:userId', checkAuth, userController.deleteUser);

module.exports = route;
