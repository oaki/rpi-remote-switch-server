import express = require("express");
import http = require("http");
import socketIo = require("socket.io");


var app = express();
var server = http.createServer(<any>app);
var io = socketIo(server);

app.use(express.static(__dirname + '/static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', () => {
    console.log('New connection')
});

server.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});