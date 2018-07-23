var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var PORT = 8000;
server.listen(PORT, () => console.log('listing to PORT ', PORT));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
    console.log('a user is connected');
    socket.on('disconnect', function () {
        console.log('user disconnectd')
    })
    socket.on('update', () => io.emit('update'));

    //chat message
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg)
    })
});

