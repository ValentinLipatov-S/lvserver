var net = require('net');
var server = net.createServer();

server.listen(9000, function() {  
  console.log('server listening to %j', server.address());
});

 sock.on('connection', function(sock) {
    console.log('CONNECTED');
 });

sock.on('data', function(data) {
  console.log('DATA');
});

sock.on('close', function(data) {
  console.log('CLOSED');
});
