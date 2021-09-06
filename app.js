const express = require('express');
const app = express();
const mongoose = require('mongoose');

// import routes
const userRoutes = require('./api/routes/user');

const connectionString = "mongodb://192.168.56.104:27017/fetnocamp";
// const localConnectionString = "mongodb+srv://wuletaw:" + process.env.MONGO_ATLAS_PWD + "@fetnocamp.jzx9n.mongodb.net/fetnocamp?retryWrites=true&w=majority";

mongoose.connect(connectionString);

// parse json data and url encoded data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found' + process.env.MONGO_ATLAS_PWD);
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;