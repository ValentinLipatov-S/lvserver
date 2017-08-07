var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send('Hello World!');
  var PORT = 6969;
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
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
