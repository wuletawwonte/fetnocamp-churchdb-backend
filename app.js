const express = require('express');
const app = express();

// use json format data
app.use(express.json());

app.use('/', (req, res) => {
    res.status(200).json({
        "message": "Thi is the root endpoint"
    });
});

module.exports = app;