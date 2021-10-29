const http = require('http');
const env = require('dotenv');
const app = require('./app');

env.config();

const PORT = process.env.PORT || 3030;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log('Server Listeneing on ' + PORT);
})
