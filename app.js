const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

// import routes
const userRoutes = require('./src/routes/user');

// const localConnectionString = "mongodb://192.168.56.104:27017/fetnocamp";
const connectionString = "mongodb+srv://wuletaw:"+process.env.MONGOATLASPWD+"@fetnocamp.jzx9n.mongodb.net/fetnocamp?retryWrites=true&w=majority";

mongoose.connect(connectionString).then(() => {
    console.log('Successfully connected to mongo db');
}).catch((err) => {
    console.log(err);
    console.error(err);
});

// parse json data and url encoded data
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// handle CORS error
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if(req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "*");
        return res.status(200).json({});
    }
    next();
});

app.use('/user', userRoutes);

app.use((req, res, next) => {
    const error = new Error('Endpoint Not found');
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