var express = require('express'),
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    io.sockets.on('connection', function (socket) {
        //var client = new Client(socket);
        //clients.push(client);
        console.log('CONNECTED');

        socket.on('message', function (msg) {
            console.log('WRITE');
            //client.onMessage(msg);
        });

        socket.on('input', function (pos) {
             console.log('INPUT');
            //client.onInput(pos);
        });

        socket.on('disconnect', function () {
            console.log('CLOSED');
            //var index = clients.indexOf(client);
            //if (index != -1) {
            //    clients.splice(index);
            //}
            client.onDisconnect();
        });
    });
server.listen(process.env.PORT || 3000);
