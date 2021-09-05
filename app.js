const express = require('express');
const app = express();

// import routes
const userRoute = require('./api/routes/user');

// use json format data
app.use(express.json());

app.use('/user', userRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
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