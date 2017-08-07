var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);



var nextUserId = 0;

var users = [];



app.set('port', (process.env.PORT || 5000));



app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');

});

io.on('connection', function (socket) {

    console.log(http);
    var socketId = socket.id;

    users.push({ 'id': socketId, 'name': "User" + nextUserId });

    nextUserId++;

    console.log(users[users.length - 1].name + ' joined with id ' + users[users.length - 1].id);

    io.emit('user connected', users[users.length - 1].name);

    socket.on('disconnect', function () {
        console.log(app.get('port') + " " + app.get('ip'));
        console.log('user disconnected');

    });

    socket.on('chat message', function (msg) {

        var name;

        for (var x = 0; x < users.length; x++) {

            if (users[x].id == socket.id) {

                name = users[x].name;

            }

        }



        io.emit('chat message', name + ": " + msg);

        console.log('message: ' + name + ": " + msg);

    });

});

http.listen(app.get('port'), function(){

    console.log('listening on port ' + app.get('port'));

});







var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

// Create a server instance, and chain the listen function to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
// The sock object the callback function receives UNIQUE for each connection
net.createServer(function(sock) {

    // We have a connection - a socket object is assigned to the connection automatically
    console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);

    // Add a 'data' event handler to this instance of socket
    sock.on('data', function(data) {
        console.log('DATA ' + sock.remoteAddress + ': ' + data);
        // Write the data back to the socket, the client will receive it as data from the server
        sock.write('You said "' + data + '"');
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
    });

}).listen(PORT, HOST);

console.log('Server listening on ' + HOST +':'+ PORT);






