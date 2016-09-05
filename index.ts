import express = require("express");
import http = require("http");
import socketIo = require("socket.io");
import util = require("util");
import bodyParser = require("body-parser");

import Socket = SocketIO.Socket;


const app = express();
const server = http.createServer(<any>app);
const io = socketIo(server);

let clientSocket: Socket;


app.use(express.static(__dirname + '/static'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    res.sendStatus(200);

    if (clientSocket) {
        clientSocket.emit("setPin", req.body);
    }
});

io.on('connection', (socket: Socket) => {
    console.log('New connection');
    clientSocket = socket;
});

server.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});