var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);



var nextUserId = 0;

var users = [];



app.set('port', (process.env.PORT || 5000));



app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');

});

var net = require('net');

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
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
