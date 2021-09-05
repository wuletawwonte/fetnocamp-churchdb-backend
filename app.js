const express = require('express');
const app = express();

// import routes
const userRoute = require('./api/routes/user');

// use json format data
app.use(express.json());

app.use('/user', userRoute);


module.exports = app;