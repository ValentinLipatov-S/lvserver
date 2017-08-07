var net = require('net');
var server = net.createServer();

server.listen(80, function() {  
  console.log('Server listening to %j', server.address());
});

 server.on('connection', function(sock) {
    console.log('CONNECTED');
 });

server.on('data', function(data) {
  console.log('DATA');
});

server.on('close', function(data) {
  console.log('CLOSED');
});
