var PORT = 5000;
var io = require('socket.io').listen(PORT);
var clients = [];
//socket.io
io.sockets.on('connection', function (socket) {
    var client = new Client(socket);
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

console.log('Server started on port: ' + PORT);
